import { View, Text, FlatList } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/search-input";
import EmptyState from "@/components/empty-state";
import { searchPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/use-appwrite";
import VideoCard from "@/components/video-card";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppWrite(() =>
    searchPosts(query as string)
  );

  console.log(query, posts);
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-xl font-psemibold text-white">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput
                initialQuery={Array.isArray(query) ? query[0] : query}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            buttonTitle="Create Video"
            route="/create"
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
