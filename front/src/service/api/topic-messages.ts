import { client } from "../index";
const namespace = '/topic-messages';

class TopicMessages {

    async _getTopicMessages(topicId: string): Promise<any> {
        try {
            const uri = `${namespace}/${topicId}`;
            const res = await client.get(uri);
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
}

const topicMessagesService = new TopicMessages();

export default topicMessagesService;