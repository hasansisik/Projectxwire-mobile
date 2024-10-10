import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, SIZES, TEXT } from "../../../constants/theme";
import general from "../../general.style";
import ReusableText from "../../Reusable/ReusableText";

const TaskCard = ({ item, navigation }) => {
  const textColor = item.status ? COLORS.black : COLORS.lightGrey;
  const descColor = item.status ? COLORS.description : COLORS.lightGrey;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TaskDetails", { item })}
    >
      <View style={styles.container}>
        <View style={general.row("space-between", "flex-start")}>
          <View style={general.row("flex-start")}>
            {item.read && <View style={styles.readCircle} />}
            <ReusableText
              text={`#${item.number}`}
              family={"regular"}
              size={TEXT.small}
              color={descColor}
            />
            <ReusableText
              text={item.taskCategory}
              family={"regular"}
              size={TEXT.small}
              color={descColor}
            />
          </View>
          <View style={general.row("space-between")}>
            <Image
              source={{
                uri:
                  item.taskCreator?.picture ||
                  "https://firebasestorage.googleapis.com/v0/b/projectxwire-e951a.appspot.com/o/user.png?alt=media&token=1beeeb68-a4c5-4a9c-b0e1-b3bd437a37fc",
              }}
              style={styles.image}
            />
            <View>
              <ReusableText
                text={item.taskCreator?.name || "Kullanıcı eklenmedi"}
                family={"regular"}
                size={TEXT.small}
                color={descColor}
              />
            </View>
          </View>
        </View>
        <View>
          <ReusableText
            text={item.taskTitle}
            family={"bold"}
            size={TEXT.medium}
            color={textColor}
          />
          <ReusableText
            text={item.taskDesc}
            family={"regular"}
            size={TEXT.medium}
            color={textColor}
          />
        </View>
        <View style={general.row("space-between")}>
          <ReusableText
            text={new Date(item.createdAt).toLocaleDateString("tr-TR")}
            family={"medium"}
            size={TEXT.small}
            color={descColor}
          />
          <ReusableText
            text={item.plan.planCode}
            family={"bold"}
            size={TEXT.small}
            color={textColor}
          />
          <View style={styles.imagesContainer}>
            {item.persons &&
              item.persons.map(
                (person, index) =>
                  person && person.picture ? ( 
                    <Image
                      key={index}
                      source={{ uri: person.picture }}
                      style={styles.userImage}
                    />
                  ) : null 
              )}
            {item.persons.length > 2 && (
              <View style={styles.moreImages}>
                <ReusableText
                  text={`${item.persons.length - 2}+`}
                  family={"medium"}
                  size={TEXT.small}
                  color={COLORS.black}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    width: SIZES.width - 40,
    borderRadius: 15,
    padding: 15,
    gap: 10,
    justifyContent: "space-between",
    borderColor: "#E7E7E7",
    borderWidth: 1,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginLeft: -10,
  },
  moreImages: {
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  readCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.orange, 
  },
});