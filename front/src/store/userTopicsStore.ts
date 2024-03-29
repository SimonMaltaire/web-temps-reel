import { defineStore } from 'pinia';
import { ref } from "vue";
import { userTopicsService } from '../service/api/index';

export const useUserTopicsStore = defineStore('user-topics', () => {
    const members = ref([]);
    const userTopics = ref([]);

    const { _addUserToTopic, _removeUserFromTopic, _topicMembers, _getTopics } = userTopicsService;

    async function addUserToTopic(topicId: string) {
        try {
            const res = await _addUserToTopic(topicId);
            return res.data;
        } catch (e) {
            throw e;
        }
    }

    async function getUserTopics() {
        try {
            const res = await _getTopics();
            userTopics.value = res;
        } catch (e) {
            throw e;
        }
    }

    async function removeUserFromTopic(topicId: string) {
        try {
            const res = await _removeUserFromTopic(topicId);
            return res.data;
        } catch (e) {
            throw e;
        }
    }

    async function topicMembers(topicId: string) {
        try {
            const res = await _topicMembers(topicId);
            members.value = res;
            return res;
        } catch (e) {
            throw e;
        }
    }


    return { addUserToTopic, removeUserFromTopic, topicMembers, members, getUserTopics, userTopics }
});