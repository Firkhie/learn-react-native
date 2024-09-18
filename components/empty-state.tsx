import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custom-button";
import { router } from "expo-router";

type EmptyStateProps = {
  buttonTitle: string;
  title: string;
  subtitle: string;
  route: any;
};

const EmptyState = ({
  title,
  subtitle,
  buttonTitle,
  route,
}: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-white mt-2">{title}</Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      <CustomButton
        title={buttonTitle}
        handlePress={() => router.push(route)}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
