const config = {

    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBuketId:(import.meta.env.VITE_APPWRITE_BUKET_ID)
}





export default config