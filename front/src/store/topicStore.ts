import { defineStore } from 'pinia';
import { ref } from "vue";
import { topicsService } from '../service/api/index';

export const useTopicStore = defineStore('topic', () => {
    const { _getTopic, _getTopics, _deleteTopic, _createTopic } = topicsService;

    const topics = ref<any>([]);
    const topic = ref<any>({});

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
        } catch (e) {
            throw e;
        }
    }

    async function deleteTopic(topicId: string) {
        try {
            const res = await _deleteTopic(topicId);
        } catch (e) {
            throw e;
        }
    }

    async function createTopic(payload: Object) {
        try {
            const res = await _createTopic(payload);
        } catch (e) {
            throw e;
        }
    }

    return { getTopic, getTopics, deleteTopic, createTopic, topics }
});