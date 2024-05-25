import axiosInstance from "@/configs/axiosInstance";


export const registerService = async (payload) => {
    try {
        const response = await axiosInstance.post(
            `/${payload.serviceApi}`,
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

export const getRegisteredServiceByPet = async (payload) => {
    try {
        const response = await axiosInstance.get(
            `/services/all-registered-services/pet?id=${payload.id}`,
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

export const getServiceDetails = async (payload) => {
    try {
        const response = await axiosInstance.get(
            `/${payload.serviceName}/${payload.id}`,
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

export const getAllRegisteredServices = async (payload) => {
    try {
        const response = await axiosInstance.get(
            "/services/all-registered-services",
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

export const updateService = async (payload) => {
    try {
        const response = await axiosInstance.patch(`/${payload.serviceApi}/${payload.id}`, payload.data, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const deleteService = async (payload) => {
    try {
        const response = await axiosInstance.delete(`/${payload.serviceApi}/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};