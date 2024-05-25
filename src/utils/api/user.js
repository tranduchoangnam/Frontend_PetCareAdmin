import axiosInstance from "@/configs/axiosInstance";

export const getUser = async (payload) => {
    try {
        const response = await axiosInstance.get("/users", {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        console.log(response);
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
};

export const registerUser = async (payload) => {
    try {
        const response = await axiosInstance.post(
            "/auth/register",
            payload.data,
            {
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            },
        );
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const updateUser = async (payload) => {
    try {
        const response = await axiosInstance.patch(`/users/${payload.id}`, payload.data, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const deleteUser = async (payload) => {
    try {
        const response = await axiosInstance.delete(`/users/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};