import EmptyState from "@/components/empty-state";
import SearchInput from "@/components/search-input";
import VideoCard from "@/components/video-card";
import { useGlobalContext } from "@/context/global-provider";
import { getBookmarkPosts } from "@/lib/appwrite";
import useAppWrite from "@/lib/use-appwrite";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data } = useAppWrite(() => getBookmarkPosts(user?.$id!));

  return (
    <SafeAreaView style={{ backgroundColor: "#161622", height: "100%" }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-xl font-psemibold text-white">
              Saved Video
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput placeholder="Search your saved videos" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            buttonTitle="Explore Videos"
            route="/home"
            title="No videos found"
            subtitle="No videos found in your bookmark"
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Bookmark;
