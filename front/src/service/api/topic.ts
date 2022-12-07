import { client } from "../index";
const namespace = '/topics';

class Topic {

    async _createTopic(payload: Object): Promise<any> {
        try {
            const uri = namespace;
            const res = await client.post(uri, payload);
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

const topicsService = new Topic();

export default topicsService;