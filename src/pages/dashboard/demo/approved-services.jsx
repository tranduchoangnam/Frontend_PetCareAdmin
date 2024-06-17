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
import { getAllRegisteredServices, completeService } from "@/utils/api/service";
import { useAuth } from "@/context/AuthProvider";
import { DocumentCheckIcon } from "@heroicons/react/24/solid";
import { serviceOptions } from "@/constants/service";
import { toast } from "react-toastify";

export function ApprovedServices() {
    const { token } = useAuth();
    const [allServices, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);

    const handleServiceSelect = (event) => {
        const selectedService = event.target.value;
        setSelectedService(selectedService);

        const filtered = allServices.filter((service) =>
            selectedService
                ? service.serviceName
                      .toLowerCase()
                      .includes(selectedService.toLowerCase())
                : true,
        );
        filterApproved(filtered);
    };

    const handleCompleteService = (id, serviceName) => {
        completeService({ token, id, serviceName }).then(() => {
            toast.success("Change status successfully");
            const updatedServices = allServices.map((service) => {
                if (service.id === id) {
                    service.status = "completed";
                }
                return service;
            });
            setServices(updatedServices);
            const filtered = updatedServices.filter((service) =>
                selectedService
                    ? service.serviceName
                          .toLowerCase()
                          .includes(selectedService.toLowerCase())
                    : true,
            );
            filterApproved(filtered);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });
    };

    const filterApproved = (servicesResponse) => {
        setFilteredServices(
            servicesResponse
                .map((service) => ({
                    ...service,
                    services: service.services.filter(
                        (s) => s.status === "approved",
                    ),
                }))
                .filter((service) => service.services.length > 0),
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesResponse = await getAllRegisteredServices({
                    token,
                });

                setServices(servicesResponse);
                filterApproved(servicesResponse);
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };
        fetchData();
    }, [token]);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
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
                        <select
                            value={selectedService}
                            onChange={handleServiceSelect}
                            className="ml-4 p-2 border rounded-md"
                        >
                            <option value="">All</option>
                            {serviceOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <table className="w-full min-w-[640px] table-auto mt-4">
                        <thead>
                            <tr>
                                {[
                                    "Pet",
                                    "Service",
                                    "Owner",
                                    "Created At",
                                    "Status",
                                    "Action",
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
                            {filteredServices.map(
                                ({ serviceName, services }) => {
                                    const className =
                                        "py-3 px-5 border-b border-blue-gray-50 overflow-hidden";
                                    return services?.length > 0
                                        ? services.map(
                                              ({
                                                  id,
                                                  pet,
                                                  createdAt,
                                                  status,
                                              }) => (
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
                                                              {
                                                                  pet.owner
                                                                      .username
                                                              }
                                                          </Typography>
                                                      </td>
                                                      <td className={className}>
                                                          <Typography
                                                              variant="small"
                                                              color="blueGray"
                                                          >
                                                              {new Date(
                                                                  createdAt,
                                                              ).toLocaleDateString(
                                                                  "en-GB",
                                                                  {
                                                                      day: "2-digit",
                                                                      month: "short",
                                                                      year: "numeric",
                                                                      hour: "2-digit",
                                                                      minute: "2-digit",
                                                                      hour12: false,
                                                                      timeZone:
                                                                          "UTC",
                                                                  },
                                                              )}{" "}
                                                              UTC
                                                          </Typography>
                                                      </td>
                                                      <td className={className}>
                                                          <Chip
                                                              variant="gradient"
                                                              color={
                                                                  status ==
                                                                  "pending"
                                                                      ? "yellow"
                                                                      : status ==
                                                                        "rejected"
                                                                      ? "red"
                                                                      : status ==
                                                                        "approved"
                                                                      ? "blue"
                                                                      : status ==
                                                                        "completed"
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
                                                              onClick={() =>
                                                                  handleCompleteService(
                                                                      id,
                                                                      serviceName.replace(
                                                                          / /g,
                                                                          "-",
                                                                      ),
                                                                  )
                                                              }
                                                              className="text-xs font-semibold text-green-400 cursor-pointer flex"
                                                          >
                                                              Complete
                                                              <DocumentCheckIcon className="h-4 w-4 ml-1" />
                                                          </Typography>
                                                      </td>
                                                  </tr>
                                              ),
                                          )
                                        : null;
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
}

export default ApprovedServices;
