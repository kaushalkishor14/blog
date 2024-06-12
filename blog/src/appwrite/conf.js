import config from "../config.js";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {

    client = new Client();
    databases;
    buket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.buket = Storage(this.client);
    }

    async createPost({ title, slug, content, featureImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createpost:: error", error)
        }
    }

    async updatePost(slug, { title, content, featureImage, status, }) {

        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )

        } catch (error) {
            console.log("Appwrite serive :: updatepost error ", error)
        }
    }

    async  deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {

         return   await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite servie :: getpost :: error",error);
            return false
        }
    }

    async getPost(queries = [
        Query.equal("status",
            "active"
        )
    ]){
        try {
            await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log("Appwrite serive :: getpost error ", error);
            return false;
        }

    }

    // file upload service

    async fileUpload(file){
        try {
            
            return await this.buket.createFile(
                config. appwriteBuketId,
                ID.unique(),
                file


            )




        } catch (error) {
            console.log("Appwrite serive : fileupload error ", error)
        }
    }

    async deleteFile(fileId){
        try {
             await this.buket.deleteFile(
                config.appwriteBuketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite serive : deletefile error ", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.buket.getFilePreview(
            config.appwriteBuketId,
            fileId
        )
    }




    
}

const service = Service()

export default service