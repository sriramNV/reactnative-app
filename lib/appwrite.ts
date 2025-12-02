import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
    userTableId: process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!,
    documentId: process.env.EXPO_PUBLIC_APPWRITE_DOCUMENT_ID!,
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);


export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserPrams) => {
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        );

        if(!newAccount) throw new Error("Account creation failed");

        await signIn({email, password});

        const avatarUrl = await avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userTableId,
            ID.unique(),
            { email, name, accountId: newAccount. $id,avatar: avatarUrl,}    
        );
        
    }

    catch(e){
        throw new Error(e as string);
    }
}

export const signIn = async ({email, password}: SignInParams) => {
    try{
        const session = await account.createEmailPasswordSession(email, password);
        return session; 
    }
    catch(e){
        throw new Error(e as string);
    }
}