import axiosInstance from "@/configs/axiosInstance";

export const getCurrentRevenue = async (payload) => {
    try {
        const response = await axiosInstance.get(`/revenue/${payload.serviceName}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const getRevenueGrowth = async (payload) => {
    try {
        const response = await axiosInstance.get(`/revenue/growth/${payload.serviceName}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
}