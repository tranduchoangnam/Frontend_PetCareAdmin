import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Button,
} from "@material-tailwind/react";
// import { allUsersData } from "@/data/test";
import { getAllUser, registerUser, deleteUser } from "@/utils/api/user";
import { useState, useEffect } from "react";
import { AddItemModal } from "@/widgets/modals";
import { useAuth } from "@/context/AuthProvider";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

export function Users() {
    const [allUser, setUser] = useState([]);
    const { token } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);
    const handleFormSubmit = (formData) => {
        try {
            // console.log(formData);
            registerUser({ token, data: formData }).then(() => {
                getAllUser({ token }).then((res) => setUser(res));
            });
        } catch (error) {
            console.error("err add user", error);
        }
    };

    const handleDelete = (id) => {
        deleteUser({ token, id }).then(() => {
            getAllUser({ token }).then((res) => setUser(res));
        });
    };

    useEffect(() => {
        try {
            console.log("token", token);
            getAllUser({ token }).then((res) => setUser(res));
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, [token]);
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <AddItemModal
                title="Add User"
                isOpen={isModalOpen}
                onClose={handleClose}
                fieldNames={[
                    "username",
                    "email",
                    "phone",
                    "password",
                    "role",
                    "avatar",
                    "gender",
                ]}
                onSubmit={handleFormSubmit}
                itemName="User"
            />
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6"
                >
                    <Typography variant="h6" color="white">
                        All Users
                    </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "User",
                                    "Email",
                                    "Phone",
                                    "Role",
                                    "",
                                    <Button
                                        color="lightBlue"
                                        size="sm"
                                        ripple="light"
                                        onClick={handleOpen}
                                    >
                                        Add
                                    </Button>,
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
                            {allUser?.map(
                                (
                                    {
                                        id,
                                        avatar,
                                        email,
                                        username,
                                        phone,
                                        role,
                                        gender,
                                    },
                                    key,
                                ) => {
                                    const className = `py-3 px-5 ${key === allUser.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;

                                    return (
                                        <tr key={username}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <Avatar
                                                        src={avatar}
                                                        size="sm"
                                                        variant="rounded"
                                                    />
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {username}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {id}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {email}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {phone}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={
                                                        role == "admin"
                                                            ? "green"
                                                            : "blue-gray"
                                                    }
                                                    value={role}
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                />
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href={
                                                        "/dashboard/demo/users/user-details/" +
                                                        id
                                                    }
                                                    className="text-xs font-semibold text-blue-gray-600 flex"
                                                >
                                                    Edit
                                                    <PencilSquareIcon className="h-4 w-4 ml-1" />
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    className="text-xs font-semibold text-red-400 cursor-pointer flex"
                                                    onClick={() =>
                                                        handleDelete(id)
                                                    }
                                                >
                                                    Delete
                                                    <TrashIcon className="h-4 w-4 ml-1" />
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

export default Users;
