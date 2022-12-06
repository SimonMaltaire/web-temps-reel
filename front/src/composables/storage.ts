import { useStorage } from '@vueuse/core'

export const useLocalStorage = () => {
    
    const token = useStorage('token', '');

    const addToken = (accessToken: string) => {
        token.value = accessToken;
    }

    const removeToken = () => {
        token.value = '';
    }

    return { token, addToken, removeToken }
}