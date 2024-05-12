import axiosInstance from "@/configs/axiosInstance";

export const getAllPetsOfOwner = async (payload) => {
    try {
        const response = await axiosInstance.get(`/pets/owner=${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
}