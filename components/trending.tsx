import { icons } from "@/constants";
import { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Video, ResizeMode } from "expo-av";
import { Document } from "@/context/global-provider";

type TrendingProps = {
  posts: Document[];
};

const zoomIn: Animatable.CustomAnimation = {
  from: { transform: [{ scale: 0.9 }] },
  to: { transform: [{ scale: 1.1 }] },
};

const zoomOut: Animatable.CustomAnimation = {
  from: { transform: [{ scale: 1 }] },
  to: { transform: [{ scale: 0.9 }] },
};

const TrendingItem = ({
  activeItem,
  item,
}: {
  activeItem: Document;
  item: Document;
}) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-2"
      animation={activeItem.key === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: item.video,
          }}
          style={{
            width: 188,
            height: 240,
            marginLeft: 9,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 35,
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
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{
            width: 188,
            height: 240,
            marginLeft: 9,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-full h-full rounded-[35px] overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }: TrendingProps) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0]);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    ></FlatList>
  );
};

export default Trending;
