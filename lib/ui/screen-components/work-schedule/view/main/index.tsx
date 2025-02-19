import { UPDATE_WORK_SCHEDULE } from "@/lib/apollo/mutations/work-schedule";
import { useUserContext } from "@/lib/context/global/user.context";
import { FlashMessageComponent } from "@/lib/ui/useable-components";
import SpinnerComponent from "@/lib/ui/useable-components/spinner";

import { ApolloError, useMutation } from "@apollo/client";
import { WorkSchedule } from "@/lib/utils/interfaces";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Switch } from "react-native-switch";
import { TWeekDays } from "@/lib/utils/types/restaurant";
import { STORE_PROFILE } from "@/lib/apollo/queries";

const { width } = Dimensions.get("window");

const daysOfWeek: TWeekDays[] = [
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
  "SUN",
];

// Generate 24-hour time slots (every 15 minutes)
const generateTimeSlots = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const formattedTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      times.push(formattedTime);
    }
  }
  return times;
};
const timeOptions = generateTimeSlots();

export default function WorkScheduleMain() {
  // Hooks
  const { t } = useTranslation();
  // States
  const [schedule, setSchedule] = useState<WorkSchedule[]>();
  const [dropdown, setDropdown] = useState<{
    dayIndex: number;
    slotIndex: number;
    type: "start" | "end";
  } | null>(null);
  //   const [timeZone, setTimeZone] = useState('')

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity
  const translateYAnim = useRef(new Animated.Value(20)).current; // Slide up
  const parallaxAnim = useRef(new Animated.Value(0)).current; // Parallax effect

  // Context
  const { dataProfile } = useUserContext();

  // API Hook
  const [updateSchedule, { loading: isUpatingSchedule }] = useMutation(
    UPDATE_WORK_SCHEDULE,
    {
      refetchQueries: [
        {
          query: STORE_PROFILE,
          variables: { id: dataProfile?._id },
        },
      ],
    },
  );
  // Handler
  const onHandlerSubmit = async () => {
    try {
      // Check for overlapping slots
      const overlapping_day = hasOverlappingSlots(schedule ?? []);
      if (overlapping_day) {
        FlashMessageComponent({
          message: `${t(overlapping_day)} ${t("has overlapping slots")}.`,
        });
        return;
      }

      // Clean the work schedule before submitting
      const cleanedWorkSchedule =
        schedule?.map(({ ...day }) => ({
          ...day,
          times: day.times
            .filter((time) => time.startTime && time.endTime) // Ensure there are no empty slots
            .map(({ ...cleanSlot }) => cleanSlot),
        })) ?? [];

      // Ensure there is valid data to send
      if (
        !cleanedWorkSchedule.length ||
        cleanedWorkSchedule.every((day) => !day.times.length)
      ) {
        FlashMessageComponent({ message: t("No valid slots to submit") });
        return;
      }

      const scheduleInput = transformSchedule(cleanedWorkSchedule);
      await updateSchedule({
        variables: scheduleInput,
        onCompleted: () => {
          FlashMessageComponent({
            message: t("Work Schedule has been updated successfully"),
          });
        },
        onError: (error) => {
          FlashMessageComponent({
            message:
              error.graphQLErrors[0]?.message ?? t("Something went wrong"),
          });
        },
      });
    } catch (err) {
      const error = err as ApolloError;
      FlashMessageComponent({
        message: error?.message || t("Something went wrong"),
      });
    }
  };

  // Handlers
  const toggleDay = (index: number) => {
    const updatedSchedule = [...(schedule ?? [])];
    // If times array is empty, add default time slot
    if (updatedSchedule[index].times.length === 0) {
      updatedSchedule[index].times = [
        {
          startTime: ["09", "00"],
          endTime: ["17", "00"],
        },
      ];
    } else {
      // If times exist, clear them
      updatedSchedule[index].times = [];
    }
    setSchedule(updatedSchedule);
  };

  function transformSchedule(schedule: WorkSchedule[] | undefined) {
    if (!schedule) return { updateTimingsId: null, openingTimes: [] };

    return {
      updateTimingsId: dataProfile?._id || null,
      openingTimes: schedule.map((daySchedule) => ({
        day: daySchedule.day.toUpperCase().substring(0, 3) || null,
        times:
          daySchedule.times.length === 0
            ? []
            : daySchedule.times.map((slot) => {
                // Ensure we're working with string format first
                const startTimeStr = Array.isArray(slot.startTime)
                  ? slot.startTime.join(":")
                  : slot.startTime;
                const endTimeStr = Array.isArray(slot.endTime)
                  ? slot.endTime.join(":")
                  : slot.endTime;

                // Ensure proper splitting of hours and minutes
                const [startHours = "00", startMinutes = "00"] =
                  startTimeStr.split(":");
                const [endHours = "00", endMinutes = "00"] =
                  endTimeStr.split(":");

                return {
                  startTime: [startHours, startMinutes],
                  endTime: [endHours, endMinutes],
                };
              }),
      })),
    };
  }

  // Helper function to convert time string (HH:mm) to minutes
  const timeToMinutes = (time: string | string[]) => {
    if (Array.isArray(time)) {
      time = time[0]; // Take the first element of the array
    }

    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const hasOverlappingSlots = (schedule: WorkSchedule[]): string => {
    for (const daySchedule of schedule) {
      if (daySchedule.times.length === 0) continue; // Skip days with no times

      const times = daySchedule.times;

      // Sort slots by start time to ensure proper order
      const sortedSlots = [...times].sort(
        (a, b) =>
          timeToMinutes(a.startTime.join(":")) -
          timeToMinutes(b.startTime.join(":")),
      );

      for (let i = 0; i < sortedSlots.length - 1; i++) {
        const currentEnd = timeToMinutes(sortedSlots[i].endTime.join(":"));
        const nextStart = timeToMinutes(sortedSlots[i + 1].startTime.join(":"));

        // If the next slot starts before the current one ends, there's an overlap
        if (nextStart < currentEnd) {
          return daySchedule.day;
        }
      }
    }

    return "";
  };

  const updateTime = (
    dayIndex: number,
    slotIndex: number,
    type: "startTime" | "endTime",
    value: string,
  ) => {
    let updatedSchedule;
    let slot;
    if (schedule?.length) {
      updatedSchedule = [...schedule];
      slot = updatedSchedule[dayIndex].times[slotIndex];

      // Ensure proper splitting of the new time value
      const [hours = "00", minutes = "00"] = value.split(":");

      // Validate start and end times
      const newTime = timeToMinutes(value);

      if (type === "startTime") {
        const endTimeStr = Array.isArray(slot.endTime)
          ? `${slot.endTime[0] || "00"}:${slot.endTime[1] || "00"}`
          : slot.endTime;
        if (slot?.endTime && newTime >= timeToMinutes(endTimeStr)) {
          FlashMessageComponent({
            message: "Start time must be earlier than end time",
          });
          return;
        }
      } else if (type === "endTime") {
        const startTimeStr = Array.isArray(slot.startTime)
          ? `${slot.startTime[0] || "00"}:${slot.startTime[1] || "00"}`
          : slot.startTime;
        if (slot?.startTime && newTime <= timeToMinutes(startTimeStr)) {
          FlashMessageComponent({
            message: "End time must be greater than start time",
          });
          return;
        }
      }

      // Check for overlapping slots
      const isOverlapping = updatedSchedule[dayIndex].times.some(
        (otherSlot, idx) => {
          if (idx === slotIndex) return false;

          const otherStart = timeToMinutes(
            Array.isArray(otherSlot.startTime)
              ? `${otherSlot.startTime[0] || "00"}:${otherSlot.startTime[1] || "00"}`
              : otherSlot.startTime,
          );
          const otherEnd = timeToMinutes(
            Array.isArray(otherSlot.endTime)
              ? `${otherSlot.endTime[0] || "00"}:${otherSlot.endTime[1] || "00"}`
              : otherSlot.endTime,
          );

          if (type === "startTime") {
            return newTime < otherEnd && newTime >= otherStart;
          } else {
            return newTime > otherStart && newTime <= otherEnd;
          }
        },
      );

      if (isOverlapping) {
        FlashMessageComponent({
          message: t("Time slot overlaps with another existing slot"),
        });
        return;
      }

      // Update the time value as an array [HH, MM]
      if (type === "startTime") {
        updatedSchedule[dayIndex].times[slotIndex].startTime = [hours, minutes];
      } else {
        updatedSchedule[dayIndex].times[slotIndex].endTime = [hours, minutes];
      }

      setSchedule(updatedSchedule);
      closeDropdown();
    }
  };

  const addSlot = (dayIndex: number) => {
    const updatedSchedule = schedule ? [...schedule] : [];
    updatedSchedule[dayIndex].times.push({
      startTime: ["09", "00"], // Properly initialize with hours and minutes
      endTime: ["17", "00"], // Properly initialize with hours and minutes
    });
    setSchedule(updatedSchedule);
  };

  const removeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedSchedule = schedule ? [...schedule] : [];
    updatedSchedule[dayIndex].times.splice(slotIndex, 1);
    setSchedule(updatedSchedule);
  };

  const closeDropdown = () => {
    if (dropdown) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 20,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setDropdown(null); // Hide dropdown after animation
      });
    }
  };

  // Handle dropdown animations
  useEffect(() => {
    if (dropdown) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [dropdown]);

  useEffect(() => {
    if (dataProfile?.openingTimes) {
      const timings = dataProfile.openingTimes;

      setSchedule(
        timings.map((daySchedule) => ({
          day: daySchedule.day || null,
          times: daySchedule.times?.length
            ? daySchedule.times.map((slot) => {
                const [startHours = "09", startMinutes = "00"] =
                  slot.startTime || [];
                const [endHours = "17", endMinutes = "00"] = slot.endTime || [];

                return {
                  startTime: [startHours, startMinutes],
                  endTime: [endHours, endMinutes],
                };
              })
            : [], // Keep empty array when no times
          __typename: "OpeningTimes",
        })),
      );
    } else {
      setSchedule(
        daysOfWeek.map((day) => ({
          day,
          times: [], // Initialize with empty times array
          __typename: "OpeningTimes",
        })),
      );
    }
  }, [dataProfile?.openingTimes]);

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View className="flex-1 items-center">
        <View className="p-2 bg-white h-[80%] w-full">
          <FlatList
            data={schedule}
            keyExtractor={(item) => item.day}
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <View className="bg-gray-200 border border-gray-300 p-4 mb-3 rounded-lg">
                {/* Day Header with Toggle */}
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-bold">{t(item.day)}</Text>
                  <Switch
                    value={item.times.some((t) => !!t)}
                    onValueChange={() => toggleDay(index)}
                    activeText={""}
                    inActiveText={""}
                    circleSize={20}
                    barHeight={25}
                    backgroundActive={"#4CAF50"}
                    backgroundInactive={"#ccc"}
                    circleBorderWidth={0}
                  />
                </View>

                {/* Time Slots */}
                {item.times.some((t) => !!t) && (
                  <View className="mt-2">
                    {item.times.map((slot, slotIndex) => {
                      const isStartTapped =
                        dropdown?.dayIndex === index &&
                        dropdown?.slotIndex === slotIndex &&
                        dropdown?.type === "start";
                      const isEndTapped =
                        dropdown?.dayIndex === index &&
                        dropdown?.slotIndex === slotIndex &&
                        dropdown?.type === "end";

                      return (
                        <View
                          key={slotIndex}
                          className="flex-row items-center justify-between mt-2 gap-x-2"
                        >
                          {/* Start Time Button */}
                          <TouchableOpacity
                            onPress={() =>
                              setDropdown({
                                dayIndex: index,
                                slotIndex,
                                type: "start",
                              })
                            }
                            className={`w-[40%] bg-white p-2 rounded-md`}
                            style={
                              isStartTapped ? style.tappedSlot : style.slot
                            }
                          >
                            <Text className="text-center">
                              {slot.startTime.join(":")}
                            </Text>
                          </TouchableOpacity>

                          <Text className="mx-">-</Text>

                          {/* End Time Button */}
                          <TouchableOpacity
                            onPress={() =>
                              setDropdown({
                                dayIndex: index,
                                slotIndex,
                                type: "end",
                              })
                            }
                            className="w-[40%] bg-white p-2 rounded-md"
                            style={isEndTapped ? style.tappedSlot : style.slot}
                          >
                            <Text className="text-center">
                              {slot.endTime.join(":")}
                            </Text>
                          </TouchableOpacity>

                          {/* Remove Slot Button */}
                          {item.times.length > 1 && slotIndex !== 0 && (
                            <TouchableOpacity
                              onPress={() => removeSlot(index, slotIndex)}
                              className="w-8 h-8 justify-center items-center border border-red-600 rounded-full"
                            >
                              <Text className="text-red-600 font-bold">−</Text>
                            </TouchableOpacity>
                          )}

                          {/* Add Slot Button */}
                          {slotIndex === 0 && (
                            <TouchableOpacity
                              onPress={() => addSlot(index)}
                              className="w-8 h-8 justify-center items-center border border-green-500 rounded-full"
                            >
                              <Text className="text-green-500 font-bold text-center">
                                +
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            )}
          />
        </View>
        <TouchableOpacity
          className="h-12 w-full bg-green-500 rounded-3xl py-3"
          style={{ width: width * 0.9 }}
          onPress={() => onHandlerSubmit()}
        >
          {isUpatingSchedule ? (
            <SpinnerComponent />
          ) : (
            <Text className="text-center text-white text-lg font-medium">
              {t("Update Schedule")}
            </Text>
          )}
        </TouchableOpacity>

        {/* Animated Dropdown */}
        {dropdown && (
          <Animated.View
            className="mb-[6rem]"
            style={{
              position: "absolute",
              bottom: -80,
              left: 5,
              right: 5,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 5,
              borderRadius: 8,
              padding: 10,
              opacity: fadeAnim,

              transform: [
                { translateY: translateYAnim },
                {
                  translateY: parallaxAnim.interpolate({
                    inputRange: [0, 300], // Adjust based on your dropdown height
                    outputRange: [0, -30], // Parallax effect range
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            <Text className="font-[Inter] text-lg font-bold mb-2">
              {t("Select Time Slot")}
            </Text>
            <ScrollView
              style={{ maxHeight: 300 }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: parallaxAnim } } }],
                { useNativeDriver: false },
              )}
              scrollEventThrottle={16}
            >
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  onPress={() =>
                    updateTime(
                      dropdown.dayIndex,
                      dropdown.slotIndex,
                      dropdown.type === "start" ? "startTime" : "endTime",
                      time,
                    )
                  }
                  className="p-2 border-b border-gray-300"
                >
                  <Text className="font-[Inter] text-center text-lg">
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const style = StyleSheet.create({
  slot: {
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  tappedSlot: {
    borderWidth: 1,
    borderColor: "#22c55e",
  },
});
