// import { instance } from "../../http/http";
import { client } from "../index";

class Request {

    async _getRequests(): Promise<any> {
        try {
            const uri = '/requests'
            const res = await client.get(uri);
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}

const request = new Request();

export default request;