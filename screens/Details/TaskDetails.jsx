import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { AppBar, ReusableText } from "../../components/index.js";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import MessagesFile from "../../components/Tiles/Upload/MessagesFile.jsx";
import CameraFile from "../../components/Tiles/Upload/CameraFile.jsx";
import ModalSelectUser from "../../components/Modals/ModalSelectUser.jsx";
import {
  addMessageToTask,
  getTaskMessages,
  getTask,
  deleteSingleMessage,
} from "../../redux/actions/taskActions.js";
import { storage } from "../../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageViewing from "react-native-image-viewing";
import { COLORS, SIZES, TEXT } from "../../constants/theme";
import splashImage from "../../assets/splash.png";
import general from "../../components/general.style.js";
import io from "socket.io-client";
import { server } from "../../config.js";
import {
  LongPressGestureHandler,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const TaskDetails = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.tasks);
  const [messageText, setMessageText] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMessagesFileVisible, setIsMessagesFileVisible] = useState(false);
  const [isModalTaskPlanVisible, setIsModalTaskPlanVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const taskId = item._id;
  const flatListRef = useRef(null);
  const socketRef = useRef(null);

  const handleDeleteMessage = async (messageId) => {
    try {
      const result = await dispatch(deleteSingleMessage({ taskId, messageId }));
      if (deleteSingleMessage.fulfilled.match(result)) {
        await dispatch(getTaskMessages(taskId));
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await dispatch(getTask(taskId));
        await dispatch(getTaskMessages(taskId));
        setLoading(false);
        if (flatListRef.current && messages.length > 0) {
          flatListRef.current.scrollToEnd({ animated: true });
        }
      };
      fetchData();
    }, [dispatch, taskId])
  );

  useEffect(() => {
    socketRef.current = io(server.replace("/v1", ""), {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join_room", taskId);
    });

    socketRef.current.on("receive_message", (message) => {
      dispatch(addMessageToTask(message));
    });

    return () => {
      socketRef.current.emit("leave_room", taskId);
      socketRef.current.disconnect();
    };
  }, [taskId, dispatch]);

  const toggleModalTaskPlan = () => {
    setIsModalTaskPlanVisible(!isModalTaskPlanVisible);
  };

  const uploadImage = async (uri, projectId) => {
    if (!uri) return null;
    const response = await fetch(uri);
    const blob = await response.blob();
    const date = new Date();
    const formattedDate = date.toISOString().split(".")[0].replace("T", "-");
    const filename = `${projectId}-${formattedDate}.jpg`;
    const storageRef = ref(storage, `ProjectxwireFile/${filename}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const handleSendMessage = async (
    imageUri,
    messageText,
    selectedUser = null
  ) => {
    let fileUrl = null;
    if (imageUri) {
      fileUrl = await uploadImage(imageUri, item._id);
    }
    const content = selectedUser ? `@${selectedUser}` : messageText;
    const payload = {
      taskId: item._id,
      content,
      senderId: user._id,
      files: fileUrl ? [fileUrl] : [],
    };
    dispatch(addMessageToTask(payload));
    socketRef.current.emit("send_message", payload);
    dispatch(getTask(item._id));
    setMessageText("");
    setSelectedImageUri(null);
  };

  const allFiles =
    messages
      ?.map((message) => message.files)
      .flat()
      .map((file) => ({ uri: file })) || [];

  const handleFilePress = (fileUri) => {
    const index = allFiles.findIndex((file) => file.uri === fileUri);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setIsVisible(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Şimdi";
    }
    const months = [
      "OCAK",
      "ŞUB",
      "MART",
      "NİS",
      "MAY",
      "HAZ",
      "TEM",
      "AĞUST",
      "EYL",
      "EKİM",
      "KAS",
      "ARALIK",
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${month}, ${year} ${hours}:${minutes}`;
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      const isCurrentUser = item.sender._id === user._id;
      const previousItem = messages[index - 1];
      const showDateAndName =
        !previousItem ||
        previousItem.sender._id !== item.sender._id ||
        formatDate(previousItem.createdAt) !== formatDate(item.createdAt);

      const isSelected = item._id === selectedMessageId;

      return (
        <LongPressGestureHandler
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              setSelectedMessageId(item._id);
            }
          }}
          minDurationMs={800}
        >
          <View style={styles.messageContainerWrapper}>
            {showDateAndName && (
              <>
                <ReusableText
                  text={formatDate(item.createdAt)}
                  family={"medium"}
                  size={TEXT.xxSmall}
                  color={COLORS.description}
                  style={styles.dateText}
                />
                <ReusableText
                  text={item.sender.name}
                  family={"regular"}
                  size={TEXT.xxSmall}
                  color={COLORS.description}
                  style={styles.dateText}
                />
              </>
            )}
            <View
              style={[
                styles.messageWrapper,
                isCurrentUser ? styles.messageRight : styles.messageLeft,
              ]}
            >
              {!isCurrentUser && (
                <Image
                  source={{ uri: item.sender.picture }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
              )}
              <View
                style={[
                  styles.messageContainer,
                  isSelected
                    ? { backgroundColor: "red" }
                    : { backgroundColor: "hsla(50, 0%, 82%, 0.4)" },
                ]}
              >
                {item.content && (
                  <Text
                    style={[
                      styles.messageText,
                      isSelected ? { color: "white" } : { color: COLORS.black },
                    ]}
                  >
                    {item.content}
                  </Text>
                )}
                {item.files && item.files.length > 0 && (
                  <FlatList
                    data={item.files}
                    horizontal
                    keyExtractor={(fileUri, index) =>
                      `${fileUri}-${index}-${item._id}`
                    }
                    renderItem={({ item: fileUri }) => (
                      <TouchableOpacity
                        onPress={() => handleFilePress(fileUri)}
                      >
                        <Image
                          source={{ uri: fileUri }}
                          style={{ width: 100, height: 100, borderRadius: 5 }}
                        />
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
              {isCurrentUser && (
                <Image
                  source={{ uri: item.sender.picture }}
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                />
              )}
            </View>
          </View>
        </LongPressGestureHandler>
      );
    },
    [user._id, messages, selectedMessageId]
  );

  if (loading) {
    return (
      <View style={general.loadingContainer}>
        <Image source={splashImage} style={general.splashImage} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.header,
            selectedMessageId
              ? { backgroundColor: COLORS.red }
              : { backgroundColor: COLORS.lightWhite },
          ]}
        >
          <AppBar
            top={40}
            left={15}
            right={20}
            title={item.taskTitle || "Başlık Belirtilmedi"}
            color={COLORS.white}
            onPress={() => navigation.goBack()}
            onDeletePress={() => handleDeleteMessage(selectedMessageId)}
            showDeleteIcon={!!selectedMessageId}
            onCloseDeleteIcon={() => setSelectedMessageId(null)}
          />
        </View>
        <TouchableOpacity
          style={styles.plan}
          onPress={() =>
            navigation.navigate("PlanDetails", { item: item.plan })
          }
        >
          <Image
            source={{ uri: item?.plan?.planImages }}
            style={{ width: 150, height: 100 }}
          />
          <View style={styles.info}>
            <ReusableText
              text={`${item?.plan?.planName} - ${item?.plan?.planCode}`}
              family={"medium"}
              size={TEXT.xSmall}
              color={COLORS.description}
            />
          </View>
          <ReusableText
            text={formatDate(item.createdAt)}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
          <ReusableText
            text={`${item?.taskTitle}`}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
          <ReusableText
            text={`${item?.taskCreator?.name}`}
            family={"regular"}
            size={TEXT.xSmall}
            color={COLORS.description}
          />
        </TouchableOpacity>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={styles.messagesList}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
        <View style={styles.inputContainer}>
          {isMessagesFileVisible && (
            <View style={styles.messagesFileContainer}>
              <TouchableOpacity
                onPress={() => {
                  setIsMessagesFileVisible(false);
                }}
              >
                <View>
                  <MessagesFile
                    onImageSelected={setSelectedImageUri}
                    onImageSend={(imageUri) => {
                      handleSendMessage(imageUri, "");
                      setIsMessagesFileVisible(false);
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View
                style={{ width: 1, height: 40, backgroundColor: COLORS.orange }}
              />
              <TouchableOpacity
                onPress={() => {
                  toggleModalTaskPlan();
                  setIsMessagesFileVisible(false);
                }}
              >
                <Ionicons name="person-add" size={22} color={COLORS.orange} />
              </TouchableOpacity>
              <View
                style={{ width: 1, height: 40, backgroundColor: COLORS.orange }}
              />
              <CameraFile
                onImageSelected={(imageUri) => setSelectedImageUri(imageUri)}
                onImageSend={(imageUri) => {
                  handleSendMessage(imageUri, "");
                  setIsMessagesFileVisible(false);
                }}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() => setIsMessagesFileVisible(!isMessagesFileVisible)}
            style={styles.toggleButton}
          >
            <Feather name="plus" size={24} color={COLORS.orange} />
          </TouchableOpacity>

          <TextInput
            style={styles.textbox}
            value={messageText}
            onChangeText={(text) => {
              setMessageText(text);
              if (text.includes("@")) {
                toggleModalTaskPlan();
                setMessageText(text.replace("@", ""));
              }
            }}
          />
          {messageText === "" && (
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => handleSendMessage(null, "👍")}
            >
              <AntDesign name="like2" size={24} color={COLORS.orange} />
            </TouchableOpacity>
          )}

          {messageText !== "" && (
            <TouchableOpacity
              style={styles.mediaButton}
              onPress={() => handleSendMessage(selectedImageUri, messageText)}
            >
              <Feather name="send" size={20} color={COLORS.orange} />
            </TouchableOpacity>
          )}
        </View>
        <ImageViewing
          images={allFiles}
          imageIndex={currentImageIndex}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />
        {isModalTaskPlanVisible && (
          <ModalSelectUser
            showFilters={isModalTaskPlanVisible}
            setShowFilters={setIsModalTaskPlanVisible}
            taskId={item?._id}
            onUserSelected={(selectedUser) => {
              handleSendMessage(null, "", selectedUser);
            }}
          />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.lightWhite,
    zIndex: 1,
    width: SIZES.width,
    height: 85,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: COLORS.lightWhite,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    height: 70,
  },
  textbox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: COLORS.lightGrey,
    marginHorizontal: 15,
    paddingHorizontal: 12,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  messagesList: {
    flex: 1,
    margin: 10,
  },
  messageContainer: {
    backgroundColor: "hsla(50, 0%, 82%, 0.4)",
    padding: 8,
    marginVertical: 8,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  messageText: {
    color: COLORS.black,
  },
  plan: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  info: {
    backgroundColor: COLORS.lightWhite,
    marginVertical: 7,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  messagesFileContainer: {
    position: "absolute",
    flexDirection: "row",
    gap: 20,
    top: -100,
    left: 5,
    backgroundColor: COLORS.lightWhite,
    height: 100,
    paddingHorizontal: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
    alignItems: "center",
  },
  messageRight: {
    alignSelf: "flex-end",
  },
  messageLeft: {
    alignSelf: "flex-start",
  },
  messageContainerWrapper: {
    alignItems: "center",
    marginVertical: 10,
  },
  messageWrapper: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
    textAlign: "center",
  },
});

export default TaskDetails;
