import { gql } from "@apollo/client";

export const UPDATE_WORK_SCHEDULE = gql`
  mutation UpdateWorkSchedule(
    $riderId: String!
    $workSchedule: [DayScheduleInput!]!
    $timeZone: String!
  ) {
    updateWorkSchedule(
      riderId: $riderId
      workSchedule: $workSchedule
      timeZone: $timeZone
    ) {
      _id
      timeZone
      workSchedule {
        day
        enabled
        slots {
          startTime
          endTime
        }
      }
    }
  }
`;