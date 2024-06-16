import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Button,
    Chip,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { getAllRegisteredServices, registerService, deleteService } from "@/utils/api/service";
import { AddItemModal } from "@/widgets/modals";
import { useAuth } from "@/context/AuthProvider";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { serviceOptions, api } from "@/constants/service";

export function Services() {
    const { token } = useAuth();
    const [allServices, setServices] = useState([]);
    const [serviceApi, setServiceApi] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const serviceFields = {
        healthcare: [
            "petId",
            "description",
            "diet",
            "date",
            "medicine",
            "additionalInfo",
        ],
        grooming: ["petId", "date", "additionalInfo"],
        boarding: ["petId", "cage", "address", "date", "additionalInfo"],
        appointment: [
            "petId",
            "description",
            "status",
            "followUp",
            "date",
            "additionalInfo",
        ],
    };

    const handleServiceSelect = (event) => {
        const selectedService = event.target.value;
        setSelectedService(selectedService);
        setServiceApi(api[selectedService]);

        const filtered = allServices.filter(service =>
            service.serviceName.toLowerCase().includes(selectedService)
        );
        setFilteredServices(filtered);
    };

    const handleAddService = () => {
        setModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            await registerService({ token, data: formData, serviceApi });
            const updatedServices = await getAllRegisteredServices({ token });
            setServices(updatedServices);
            setFilteredServices(updatedServices.filter(service =>
                service.serviceName.toLowerCase().includes(selectedService)
            ));
        } catch (error) {
            console.error("Error adding service:", error);
        }
    };

    const handleDelete = async (id, serviceApi) => {
        try {
            await deleteService({ token, id, serviceApi });
            const updatedServices = await getAllRegisteredServices({ token });
            setServices(updatedServices);
            setFilteredServices(updatedServices.filter(service =>
                service.serviceName.toLowerCase().includes(selectedService)
            ));
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesResponse = await getAllRegisteredServices({ token });
                setServices(servicesResponse);
                setFilteredServices(servicesResponse.sort((a, b) => {
                    const aPending = a.services.some(service => service.status === "pending");
                    const bPending = b.services.some(service => service.status === "pending");
                    return bPending - aPending;
                }));
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            <AddItemModal
                title="Add Service"
                isOpen={isModalOpen}
                onClose={handleClose}
                serviceType={selectedService}
                fieldNames={serviceFields[selectedService] || []}
                onSubmit={handleFormSubmit}
            />
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6"
                >
                    <Typography variant="h6" color="white">
                        All Registered Services
                    </Typography>
                </CardHeader>
                <CardBody className="px-0 pt-0 pb-2">
                    <div className="flex justify-end items-center px-5">
                        <Button
                            onClick={handleAddService}
                            disabled={!selectedService}
                        >
                            Add Service
                        </Button>
                        <select
                            value={selectedService}
                            onChange={handleServiceSelect}
                            className="ml-4 p-2 border rounded-md"
                        >
                            <option value="">All</option>
                            {serviceOptions.map((option) => (
                                <option key={option.value} value={option.value} >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <table className="w-full min-w-[640px] table-auto mt-4">
                        <thead>
                            <tr>
                                {["Pet", "Service", "Owner", "Created At", "Status", "Action", ""].map((el) => (
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
                            {filteredServices.map(({ serviceName, services }) => {
                                const className =
                                    "py-3 px-5 border-b border-blue-gray-50 overflow-hidden";
                                return services.length > 0
                                    ? services.map(({ id, pet, createdAt, status }) => (
                                        <tr key={id}>
                                            <td
                                                className={
                                                    className +
                                                    " flex items-center gap-4"
                                                }
                                            >
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
                                                    {pet.owner.username}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    variant="small"
                                                    color="blueGray"
                                                >
                                                    {new Date(createdAt).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                        timeZone: 'UTC'
                                                    })} UTC
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={
                                                        status == "pending"
                                                            ? "yellow"
                                                            : status == "rejected"
                                                                ? "red"
                                                                : status == "approved"
                                                                    ? "blue"
                                                                    : status == "completed"
                                                                        ? "green"
                                                                        : "gray"
                                                    }
                                                    value={status}
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                />
                                            </td>
                                            <td className={className}>
                                                <Typography
                                                    as="a"
                                                    href={
                                                        "/dashboard/demo/services/" +
                                                        serviceName.replace(
                                                            / /g,
                                                            "-",
                                                        ) +
                                                        "/" +
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
                                                        handleDelete(id, serviceName.replace(
                                                            / /g,
                                                            "-",
                                                        ))
                                                    }
                                                >
                                                    Delete <TrashIcon className="h-4 w-4 ml-1" />
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))
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
