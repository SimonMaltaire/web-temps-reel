import socket from "..";
import { useRequestStore } from "../store/requests";
import { createToast } from "mosha-vue-toastify";

socket.on("request-updated", request => {
    const { removeRequest } = useRequestStore();
    removeRequest(request.id);
});

socket.on("request-admin-success", payload => {
    const { addRequest } = useRequestStore();
    addRequest(payload.request);
});

socket.on("request-sent", payload => {
    createToast(payload.message, { position: "bottom-right", type: "warning" });
})