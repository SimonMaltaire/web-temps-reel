import { instance } from "../../http/http";

class Security {

    async _signin(payload: { email: string, password: string }): Promise<any> {
        try {
            const uri = '/signin'
            const res = await instance.post(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _signup(payload: Object): Promise<any> {
        try {
            const uri = '/signup'
            const res = await instance.post(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 
}

const security = new Security();

export default security;