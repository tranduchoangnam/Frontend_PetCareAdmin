import axiosInstance from "@/configs/axiosInstance";

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
