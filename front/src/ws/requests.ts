import socket from "..";
import { useRequestStore } from "../store/requests";
import { createToast } from "mosha-vue-toastify";

export const requestAdmin = (payload: { userId: string }) => {
    socket.emit("request-admin", {
        ...payload,
        status: "PENDING"
    });
};

export const updateRequestWS = (payload: { userId: string, requestId?: string, chatId: string, status: string }) => {
    socket.emit("update-request", payload);
}

socket.on("requests", paylaod => {
    console.log("requests", paylaod)
});

socket.on("request-sent-error", message => {
    createToast(message, { position: "bottom-right", type: "warning" });
});

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
});