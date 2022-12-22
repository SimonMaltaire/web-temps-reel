// import { instance } from "../../http/http";
import { client } from "../index";

class User {

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