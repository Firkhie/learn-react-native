import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

type SearchInputProps = {
  title?: string;
  initialQuery?: string;
  value?: any;
  handleChangeText?: (text: string) => void;
  otherStyles?: string;
  keyboardType?: any;
  placeholder?: string;
};

const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  initialQuery,
  ...props
}: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="w-full h-16 px-4 bg-black-100 border-black-200 border-2 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
