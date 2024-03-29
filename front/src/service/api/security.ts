// import { instance } from "../../http/http";
import { clientWithoutAuth } from "../index"

class Security {

    async _signin(payload: { email: string, password: string }): Promise<any> {
        try {
            const uri = '/signin'
            const res = await clientWithoutAuth.post(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _signinWithToken(token: string): Promise<any> {
        try {
            const uri = '/tokenSignin'
            const res = await clientWithoutAuth.post(uri, { token: token });
            return res.data;
        } catch (error) {
            throw error;
        }
    } 

    async _signup(payload: Object): Promise<any> {
        try {
            const uri = '/signup'
            const res = await clientWithoutAuth.post(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    } 
}

const security = new Security();

export default security;