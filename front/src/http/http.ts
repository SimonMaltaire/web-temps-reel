import axios from "axios";
import { useLocalStorage } from "../composables/storage";
const { token } = useLocalStorage();

export const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const instanceToken = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.value}`
    }
});