import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import { getAllPets } from "@/utils/api/pet";
import { useState, useEffect } from "react";

export function Pets() {
    const [allPets, setPets] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        try {
            getAllPets({ token }).then((res) => setPets(res));
        } catch (error) {
            console.error("Error fetching pets:", error);
        }
    }, []);
    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
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
                <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {[
                                    "Id",
                                    "Name",
                                    "Age",
                                    "Gender",
                                    "Owner",
                                    "",
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
                            {allPets.map(
                                (
                                    {
                                        id,
                                        name,
                                        age,
                                        color,
                                        gender,
                                        breed,
                                        avatar,
                                        ownerId,
                                    },
                                    key,
                                ) => {
                                    const className = `py-3 px-5 ${
                                        key === allPets.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                    }`;

                                    return (
                                        <tr key={name}>
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
                                                    {ownerId}
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
