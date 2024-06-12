import config from "../config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;


    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ eamil, name, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), eamil, password)
            if (userAccount) {
                return this.login({ eamil, password });

            } else {
                return userAccount;

            }

        } catch (error) {
            throw error;
        }
    }

    async login({ eamil, password }) {
        try {
            return await this.account.createEmailPasswordSession(eamil, password)

        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console,log("Appwrite serive :: logout:: error" , error);
        }
    }

}

const authService = new AuthService()

export default authService