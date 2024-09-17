import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  project: "66e8d888002e956cb47a",
  platform: "com.native.tutorial",
  databaseId: "66e8da08002265b0c988",
  userCollectionId: "66e8da210004f1ea1725",
  videoCollectionId: "66e8da3b000050264c23",
  storageId: "66e8db8b00326fe1535c",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.project)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn({ email, password });

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    // const currentSession = await account.getSession("current");
    // if (currentSession) {
    //   return currentSession;
    // } else {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
    // }
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
