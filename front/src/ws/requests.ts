import socket from "..";
import { useRequestStore } from "../store/requests";
import { useUserStore } from "../store/userStore";
import { createToast } from "mosha-vue-toastify";
import { storeToRefs } from "pinia";
import { useChatStore } from "../store/chat";

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

socket.on("request-updated", async (request) => {
    const { removeRequest, getAcceptedRequests } = useRequestStore();
    await getAcceptedRequests();
    removeRequest(request.id);
});

socket.on("request-accepted-by-admin", async payload => {
    const { getRequestAdmin } = useChatStore();
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);
    const requestAdmin = await getRequestAdmin();
    users.value.unshift(requestAdmin[0]);
    createToast("Your request have been accepted by an admin, go to message", { position: "bottom-right", type: "success" });
});

socket.on("request-completed-by-admin", async payload => {
    const { removeAdminIfExist } = useUserStore();
    removeAdminIfExist();
});

socket.on("request-admin-success", payload => {
    const { addRequest } = useRequestStore();
    addRequest(payload.request);
});

socket.on("request-sent", payload => {
    createToast(payload.message, { position: "bottom-right", type: "warning" });
});