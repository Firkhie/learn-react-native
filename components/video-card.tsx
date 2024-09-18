import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { Document, useGlobalContext } from "@/context/global-provider";
import { Video, ResizeMode } from "expo-av";
import { createBookmark } from "@/lib/appwrite";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: Partial<Document>) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const bookmark = async () => {
    await createBookmark(user?.$id!, $id);
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2 relative">
          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </TouchableOpacity>
          {isVisible && (
            <View className="absolute top-10 -left-24 bg-white rounded-lg w-[100px] py-3 px-2 z-50">
              <TouchableOpacity
                className="flex-row items-center justify-between"
                onPress={bookmark}
              >
                <Text className="text-xs font-plight">Bookmark</Text>
                <Image
                  source={icons.bookmark}
                  className="w-4 h-4"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {play ? (
        <Video
          source={{
            uri: video,
          }}
          style={{
            width: "100%",
            height: 240,
            marginTop: 12,
            borderRadius: 12,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
