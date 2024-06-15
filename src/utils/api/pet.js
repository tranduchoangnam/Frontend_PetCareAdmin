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

export const getPetNumber = async (payload) => {
    try {
        const response = await axiosInstance.get("/pets/number", {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
}

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
};

export const getAllPetsOfOwner = async (payload) => {
    try {
        const response = await axiosInstance.get(
            `/pets/all/owner=${payload.id}`,
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

export const addPet = async (payload) => {
    try {
        const response = await axiosInstance.post("/pets", payload.data, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const updatePet = async (payload) => {
    try {
        const response = await axiosInstance.patch(`/pets/${payload.id}`, payload.data, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};

export const deletePet = async (payload) => {
    try {
        const response = await axiosInstance.delete(`/pets/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${payload.token}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log("error", err);
    }
};
