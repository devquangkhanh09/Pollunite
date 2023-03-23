import { useEffect, useState } from "react";
import {
  onSnapshot,
  doc,
  getFirestore,
  DocumentData,
} from "firebase/firestore";
import { auth } from "../services/firebaseAuth";
import { View, Pressable, ScrollView } from "react-native";
import { Text, Avatar } from "@react-native-material/core";
import * as ImagePicker from "expo-image-picker";
import { updateProfileImage } from "../services/firebaseFirestore";
import { toBlob } from "../services/imageService";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { PhotoGrid } from "react-native-photo-grid-frame";
import { LogBox } from "react-native";

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

const Photos = [
  {
    url: "https://cdn.pixabay.com/photo/2014/04/17/23/26/environmental-protection-326923__480.jpg",
  },
  {
    url: "https://img.freepik.com/free-vector/protecting-environment-concept-illustration_114360-11985.jpg?w=2000",
  },
  {
    url: "https://www.mohitecommerce.com/news/wp-content/uploads/2022/12/environment-clean-1200x720.jpg",
  },
  {
    url: "https://img.freepik.com/free-vector/ecology-pollution-cleaning-composition-with-urban-scenery-cityscape-group-adults-children-gathering-trash-vector-illustration_1284-72974.jpg",
  },
  {
    url: "https://previews.123rf.com/images/majeczka/majeczka1106/majeczka110600015/9731741-natural-clean-environment.jpg",
  },
  {
    url: "https://static6.depositphotos.com/1004999/574/i/600/depositphotos_5743212-stock-photo-green-environment.jpg",
  },
];

const ProfileScreen = (): JSX.Element => {
  const [profile, setProfile] = useState<DocumentData | undefined>({});

  const db = getFirestore();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const profileRef = doc(db, `users/${currentUser?.uid}`);
    onSnapshot(profileRef, (profileSnapshot) => {
      const data = profileSnapshot.data();
      setProfile(data);
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      const blob = await toBlob(result.assets![0]?.uri);

      updateProfileImage(currentUser?.uid, blob);
    }
  };

  return (
    <ScrollView className="flex-col mx-2 mt-10">
      <View className="flex-row items-center justify-between w-full mx-2">
        <View className="">
          <Pressable onPress={pickImage}>
            <Avatar
              image={
                !profile?.imageUrl
                  ? require("../../assets/imgs/avatar.png")
                  : { uri: profile?.imageUrl }
              }
              size={70}
            />
          </Pressable>
          {/* <Text style={{ fontStyle: "italic" }}>Touch to change avatar</Text> */}
        </View>
        <View className="w-1/2 flex-col">
          <Text
            className="font-bold text-xl"
            style={{ fontSize: 16, marginRight: 0, fontWeight: "bold" }}
          >
            {profile?.name}
          </Text>
          <Text
            className="font-bold text-sm"
            style={{ fontSize: 13, marginRight: 0 }}
          >
            {profile?.email}
          </Text>
        </View>
        <View className="flex-row space-x-1 ml-3 mr-4">
          <MaterialCommunityIcons name="message" size={26} />
          <MaterialIcons name="person-add" size={26} />
        </View>
      </View>
      <View className="mt-7 flex-row justify-between mx-3">
        <View className="flex-col items-center space-y-2">
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#ff005c" }}>
            1063
          </Text>
          <Text>Points</Text>
        </View>
        <View className="flex-col space-y-2 items-center border-x-2 px-9 mx-0">
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#ff005c" }}>
            98
          </Text>
          <Text>Problems</Text>
        </View>
        <View className="flex-col space-y-2 items-center">
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#ff005c" }}>
            250
          </Text>
          <Text>Solved</Text>
        </View>
      </View>
      <PhotoGrid PhotosList={Photos} borderRadius={10} />
      <ScrollView className="px-0"></ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;
