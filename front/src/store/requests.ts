import { defineStore } from 'pinia';
import { ref } from "vue";
import { request } from "../service/api/index";
import { Request } from '../interfaces/interfaces';

export const useRequestStore = defineStore('request', () => {
    const { _getRequests, _getAcceptedRequests } = request;

    const requests = ref<Request[]>([]);
    const acceptedRequests = ref<Request[]>([]);

    async function getRequests() {
        try {
            const res = await _getRequests();
            requests.value = res;
        } catch (e) {
            throw e;
        }
    }

    async function getAcceptedRequests() {
        try {
            const res = await _getAcceptedRequests();
            acceptedRequests.value = res;
        } catch (e) {
            throw e;
        }
    }

    async function addRequest(request: Request) {
        try {
            requests.value.push(request);
        } catch (e) {
            throw e;
        }
    }

    async function removeRequest(id: string) {
        try {
            const requestIdSetForDeletion = requests.value.findIndex(request => request.id === id);
            requests.value.splice(requestIdSetForDeletion, 1);
        } catch (e) {
            throw e;
        }
    }

    return { getRequests, removeRequest, addRequest, requests, acceptedRequests, getAcceptedRequests }
});