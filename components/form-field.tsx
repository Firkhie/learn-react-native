import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { icons } from "@/constants";

type FormFieldProps = {
  title: string;
  value: any;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: any;
  placeholder: string;
};

const FormField = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b2b"
          onChangeText={handleChangeText}
          // keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
          // {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
