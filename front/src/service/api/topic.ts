import { instance } from "../../http/http";
const namespace = '/topics';

class Topic {

    async _createTopic(payload: Object): Promise<any> {
        try {
            const uri = namespace;
            const res = await instance.post(uri, payload);
            return res.data;
        } catch (error) {
            return error;
        }
    } 

    async _getTopics(): Promise<any> {
        try {
            const uri = namespace;
            console.log(uri)
            const res = await instance.get(uri);
            return res.data;
        } catch (error) {
            return error;
        }
    } 

    async _getTopic(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}`;
            const res = await instance.get(uri);
            return res.data;
        } catch (error) {
            return error;
        }
    } 

    async _deleteTopic(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}`;
            const res = await instance.delete(uri);
            return res.data;
        } catch (error) {
            return error;
        }
    } 
}

const topicsService = new Topic();

export default topicsService;