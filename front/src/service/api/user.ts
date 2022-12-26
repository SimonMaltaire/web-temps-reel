// import { instance } from "../../http/http";
import { client } from "../index";

class User {

    async _getNonAdminUsers(): Promise<any> {
        try {
            const uri = '/users'
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _getUser(): Promise<any> {
        try {
            const uri = '/users/me'
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async _updateUser(payload: { isAvailable: boolean }): Promise<any> {
        try {
            const uri = '/users'
            const res = await client.put(uri, payload);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}

const user = new User();

export default user;