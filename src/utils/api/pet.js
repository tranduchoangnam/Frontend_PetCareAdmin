import axiosInstance from "@/configs/axiosInstance";

export const getAllPets = async (payload) => {
    try {
        const response = await axiosInstance.get("/pets/all", {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const getPetDetails = async (payload) => {
    try {
        const response = await axiosInstance.get(`/pets/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
}

export const getAllPetsOfOwner = async (payload) => {
    try {
        const response = await axiosInstance.get(`/pets/all/owner=${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
}