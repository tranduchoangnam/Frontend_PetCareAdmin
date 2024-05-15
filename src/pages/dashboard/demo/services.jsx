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
import { useState, useEffect } from "react";
import { getAllRegisteredServices } from "@/utils/api/service";

export function Services() {
    const [allServices, setServices] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        try {
            getAllRegisteredServices({ token }).then((res) => setServices(res));
        } catch (error) {
            console.error("Error fetching services:", error);
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
                                    "Pet",
                                    "Service",
                                    "Owner",
                                    "Created At",
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
                            {allServices.map(({ serviceName, services }) => {
                                const className =
                                    "py-3 px-5 border-b border-blue-gray-50 overflow-hidden";
                                return services.length > 0
                                    ? services.map(
                                        ({ id, pet, createdAt }) => (
                                            <tr key={id}>
                                                <td className={className + " flex items-center gap-4"}>
                                                <Avatar
                                                        src={pet.avatar}
                                                        alt={pet.name}
                                                        size="sm"
                                                        variant="rounded"
                                                    />
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {pet.name}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {pet.breed}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        color="blueGray"
                                                    >
                                                        {serviceName}
                                                    </Typography>
                                                </td>                                                
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        color="blueGray"
                                                    >
                                                        { pet.owner.username }
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        color="blueGray"
                                                    >
                                                        {createdAt}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href={
                                                        "/dashboard/demo/services/" + serviceName.replace(/ /g, '-') + "/" +
                                                        id
                                                    }
                                                    className="text-xs font-semibold text-blue-gray-600"
                                                >
                                                    Edit
                                                </Typography>
                                            </td>
                                            </tr>
                                        ),
                                    )
                                    : null;
                            })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default Services;
