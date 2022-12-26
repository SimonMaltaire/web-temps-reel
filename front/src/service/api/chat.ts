import { client } from "../index";
const namespace = '/chats';

class Chat {

    async _createChat(payload: { userIds: String[] }): Promise<any> {
        try {
            const uri = `${namespace}`;
            const res = await client.post(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _getChatMessages(chatId: string): Promise<any> {
        try {
            const uri = `${namespace}/${chatId}/messages`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _getRequestAdmin(): Promise<any> {
        try {
            const uri = `${namespace}/requests/admin`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }  

    async _getChat(chatId: string): Promise<any> {
        try {
            const uri = `${namespace}/${chatId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }  

    async _getUserChats(): Promise<any> {
        try {
            const uri = `${namespace}`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }  
    
}

const chatService = new Chat();

export default chatService;