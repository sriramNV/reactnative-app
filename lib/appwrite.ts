import { CreateUserPrams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, TablesDB } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!,
    databaseId: "692ee8330004ee497638",
    userTableId: 'usersTable',
    documentId: process.env.EXPO_PUBLIC_APPWRITE_DOCUMENT_ID!,
    collectionId: 'usersTable'
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);


export const account = new Account(client);
export const databases = new Databases(client);
export const tableTB = new TablesDB(client);

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

        return await tableTB.createRow(
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

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();
        
        if(!currentAccount) throw new Error("Account not found");

        const currentUser = await tableTB.getRow(
            appwriteConfig.databaseId,
            appwriteConfig.userTableId,       
            currentAccount.$id,
            [Query.equal("accountId", currentAccount.$id)]
        );
        if(!currentUser) throw new Error("User not found");

        return currentUser.row[0];
    }
    catch(e){
        console.log(e);
    }
}