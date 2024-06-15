import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Button,
} from "@material-tailwind/react";
import { getAllPets, addPet, deletePet } from "@/utils/api/pet";
import { useState, useEffect } from "react";
import AddPetModal from "@/widgets/modals/add-pet-modal";
import { getAllUser } from "@/utils/api/user";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthProvider";

export function Pets() {
    const { token } = useAuth();
    const [allPets, setPets] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleDelete = (id) => {
        deletePet({ token, id })
            .then(() => getAllPets({ token }))
            .then((res) => setPets(res))
            .catch((error) => console.error("Error deleting pet:", error));
    };
    const handleClose = () => setModalOpen(false);
    const handleFormSubmit = (formData) => {
        const { ownerEmail, ...rest } = formData;
        getAllUser({ token })
            .then((users) => {
                const owner = users.find((user) => user.email === ownerEmail);
                if (!owner) {
                    toast.error("Owner not found");
                    return;
                }
                const newPetData = {
                    ...rest,
                    ownerId: owner.id,
                };
                return addPet({ token, data: newPetData });
            })
            .then(() => getAllPets({ token }))
            .then((res) => {
                setPets(res);
                setModalOpen(false);
            })
            .catch((error) => console.error("Error adding pet:", error));
    };

    useEffect(() => {
        getAllPets({ token })
            .then((res) => setPets(res))
            .catch((error) => console.error("Error fetching pets:", error));
    }, []);
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <AddPetModal
                isOpen={isModalOpen}
                onClose={handleClose}
                fieldNames={[
                    "ownerEmail",
                    "name",
                    "age",
                    "color",
                    "gender",
                    "breed",
                    "avatar",
                    "weight"
                ]}
                onSubmit={handleFormSubmit}
                itemName="Pet"
            />
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6"
                >
                    <Typography variant="h6" color="white">
                        All Pets
                    </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "Id",
                                    "Name",
                                    "Age",
                                    "Gender",
                                    "Weight",
                                    "Owner",
                                    "",
                                    <Button
                                        color="lightBlue"
                                        size="sm"
                                        ripple="light"
                                        onClick={handleOpen}
                                    >
                                        Add
                                    </Button>,
                                    ,
                                ].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {allPets?.map(
                                (
                                    {
                                        id,
                                        name,
                                        age,
                                        owner,
                                        gender,
                                        weight,
                                        breed,
                                        avatar,
                                        ownerId,
                                    },
                                    key,
                                ) => {
                                    const className = `py-3 px-5 ${key === allPets.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={id}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar
                                                        src={avatar}
                                                        alt={name}
                                                        size="sm"
                                                        variant="rounded"
                                                    />
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {name}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {breed}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {name}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {age}
                                                </Typography>
                                            </td>
                                            {/* <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {gender}
                                                </Typography>
                                            </td> */}
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={
                                                        gender == "male"
                                                            ? "blue"
                                                            : "pink"
                                                    }
                                                    value={gender}
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                />
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {weight}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {owner.username}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href={
                                                        "/dashboard/demo/pets/pet-details/" +
                                                        id
                                                    }
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Edit
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    className="text-xs font-semibold text-red-400 cursor-pointer"
                                                    onClick={() =>
                                                        handleDelete(id)
                                                    }
                                                >
                                                    Delete
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default Pets;
