import { defineStore } from 'pinia';
import { ref } from "vue";
import { topicMessagesService, topicsService } from '../service/api/index';

export const useTopicStore = defineStore('topic', () => {
    const { _getTopic, _getTopics, _deleteTopic, _createTopic, _updateTopic } = topicsService;
    const { _getTopicMessages } = topicMessagesService;
    
    const topics = ref<any>([]);
    const topic = ref<any>({});

    const messages = ref<any>([]);

    async function getTopics() {
        try {
            const res = await _getTopics();
            topics.value = res;
        } catch (e) {
            throw e;
        }
    }

    async function getTopic(topicId: string) {
        try {
            const res = await _getTopic(topicId);
            topic.value = res;
        } catch (e) {
            throw e;
        }
    }

    async function getTopicMessages(topicId: string) {
        try {
            const res = await _getTopicMessages(topicId);
            messages.value = res;
        } catch (e) {
            throw e;
        }
    }

    function addMessage(payload: Object) {
        messages.value.push(payload);
    }

    async function updateTopic(payload: { name: string, size: number, topicId: string }) {
        try {
            const res = await _updateTopic(payload);
            topics.value.splice(topics.value.findIndex((topic: any) => topic.id === res.id), 1, res);
        } catch (e) {
            throw e;
        }
    }

    async function deleteTopic(topicId: string) {
        try {
            const res = await _deleteTopic(topicId);
            topics.value.splice(topics.value.findIndex((topic: any) => topic.id === res.id), 1);
        } catch (e) {
            throw e;
        }
    }

    async function createTopic(payload: Object) {
        try {
            const res = await _createTopic(payload);
            topics.value.push(res);
        } catch (e) {
            throw e;
        }
    }

    return { getTopic, getTopics, deleteTopic, createTopic, updateTopic, topics, topic, messages, getTopicMessages, addMessage }
});