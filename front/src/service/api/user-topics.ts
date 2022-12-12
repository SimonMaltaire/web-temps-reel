import { client } from "../index";
const namespace = '/user-topics';

class UserTopics {

    async _addUserToTopic(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}`;
            const res = await client.post(uri, {});
            return res.data;
        } catch (error) {
            throw error;
        }
    } 
    
    async _removeUserFromTopic(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}`;
            const res = await client.delete(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _topicMembers(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}/members`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _updateTopic(payload: { name: string, size: number, topicId: string }): Promise<any> {
        try {
            const uri = `${namespace}/${payload.topicId}`;
            const res = await client.put(uri, { name: payload.name, size: payload.size });
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _getTopics(): Promise<any> {
        try {
            const uri = namespace;
            console.log(uri)
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _getTopic(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}`;
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _deleteTopic(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}`;
            const res = await client.delete(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 
}

const userTopicsService = new UserTopics();

export default userTopicsService;