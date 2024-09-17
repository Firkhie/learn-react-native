import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "@/constants";

type SearchInputProps = {
  title?: string;
  value: any;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: any;
  placeholder: string;
};

const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}: SearchInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b2b"
        onChangeText={handleChangeText}
        // keyboardType={keyboardType}
        secureTextEntry={title === "Password" && !showPassword}
        // {...props}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
