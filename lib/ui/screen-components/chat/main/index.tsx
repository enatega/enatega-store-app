import { View, Text, Platform, StyleSheet, Image } from "react-native";

import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import { useChatScreen } from "@/lib/hooks/useChat";
import { SendIcon } from "@/lib/ui/useable-components/svg";
import { Entypo, FontAwesome } from "@expo/vector-icons";

export default function ChatMain() {
  // Hook
  const {
    messages,
    onSend,
    image,
    setImage,
    inputMessage,
    setInputMessage,
    profile,
  } = useChatScreen();

  const filterImages = (src) => {
    setImage(image.filter((item) => item !== src));
  };

  const renderSend = (props) => {
    return (
      <Send {...props} sendButtonProps={{ ...props, onPress: onSend }}>
        <View className="m-2">
          <SendIcon width={30} height={30} />
        </View>
      </Send>
    );
  };

  const renderChatEmpty = () => {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="font-[Inter] text-2xl text-gray-900 mt-[300px]">
          No New Chats
        </Text>
      </View>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "black",
          },
        }}
        wrapperStyle={{
          right: styles.bubbleRight,
          left: styles.bubbleLeft,
        }}
        usernameStyle={{ color: "black" }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="green" />;
  };

  const renderAccessory = (props) => {
    return (
      <View>
        {image?.map((item) => (
          <View key={item?.uri ?? ""}>
            <Image source={{ uri: item }} />
            <Entypo
              onPress={() => filterImages(item)}
              name="circle-with-cross"
              size={18}
              style={styles.accessoryIcon}
              color="black"
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="flex-1" style={styles.chatContainer}>
      <GiftedChat
        messages={messages}
        user={{
          _id: profile?.rider?._id ?? "",
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderAvatar={null}
        renderUsernameOnMessage
        renderChatEmpty={renderChatEmpty}
        inverted={Platform.OS !== "web" || messages.length === 0}
        timeTextStyle={{
          left: { color: "blue" },
          right: { color: "green" },
        }}
        placeholder="Chats Here"
        // textInputStyle={{ paddingTop: 10 }}
        // renderAccessory={image.length > 0 ? renderAccessory : null}
        text={inputMessage ?? ""}
        onInputTextChanged={(m) => setInputMessage(m)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    marginBottom: Platform.OS === "android" ? "80px" : 0,
  },
  rowDisplay: {
    display: "flex",
    flexDirection: "row",
  },
  accessoryContainer: {
    height: 100,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
  },
  accessoryImg: { height: 40, width: 40, borderRadius: 5 },
  accessoryIcon: {
    marginLeft: -10,
    marginTop: -10,
    position: "relative",
    elevation: 999,
  },
  sendIcon: { marginBottom: 7, marginRight: 10 },
  emptyChat: {
    marginTop: 300,
    transform: [{ scaleY: -1 }],
    alignSelf: "center",
  },
  bubbleRight: {
    backgroundColor: "black",
    padding: 5,
    marginBottom: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 0,
  },
  bubbleLeft: {
    backgroundColor: "green",
    padding: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 15,
  },
});
