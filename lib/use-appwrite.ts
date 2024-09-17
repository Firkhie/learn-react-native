import { useEffect, useState } from "react";
import { getAllPosts } from "./appwrite";
import { Alert } from "react-native";
import { Document } from "@/context/global-provider";

type FetchFunction = () => Promise<Document[]>;

const useAppWrite = (fn: FetchFunction) => {
  const [data, setData] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  
  return { data, isLoading, refetch };
};

export default useAppWrite;
