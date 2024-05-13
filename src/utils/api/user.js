import axiosInstance from "@/configs/axiosInstance";

export const getUser = async (payload) => {
    try {
        const response = await axiosInstance.get(`/users/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const getAllUser = async (payload) => {
    try {
        const response = await axiosInstance.get("/users/all", {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const getUserDetails = async (payload) => {
    try {
        const response = await axiosInstance.get(`/users/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
}