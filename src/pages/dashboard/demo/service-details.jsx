import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import {
    PencilSquareIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { useState, useEffect } from "react";
import { getServiceDetails, updateService } from "@/utils/api/service";
import { useAuth } from "@/context/AuthProvider";

export function ServiceDetails() {
    const { token } = useAuth();
    const [serviceDetails, setService] = useState(null);
    const [serviceview, setServiceview] = useState(null);
    const [pet, setPet] = useState(null);
    const [editable, setEditable] = useState(false);
    const { serviceName, id } = useParams();
    const serviceApi = serviceName.replace(/ /g, "-");
    // console.log(serviceName, id)
    const edit = () => {
        setEditable(!editable);
    };

    const handleSave = async (data) => {
        try {
            updateService({ token, data, id, serviceApi }).then(() => {
                getServiceDetails({ token }).then((res) => {
                    setService(res);
                    console.log("test", res)
                });
            });
        } catch (error) {
            console.error("err update user", error);
        }
    };

    useEffect(() => {
        try {
            getServiceDetails({ token, id, serviceName }).then((res) => {
                const { pet, ...service } = res;
                setService(service);
                setPet(pet);
                const { id, petId, serviceName, updatedAt, ...serviceview } =
                    service;
                setServiceview(serviceview);
                // console.log(res);
            });
        } catch (error) {
            console.error("Error fetching pet data:", error);
        }
    }, []);

    return (
        <>
            <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
                <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
            </div>
            <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <Avatar
                                src={pet?.avatar}
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography className="font-bold text-blue-gray-600">
                                    {pet?.breed}
                                </Typography>
                                <div className="flex">
                                    <Typography className="font-bold">
                                        ID:{" "}
                                    </Typography>
                                    {pet?.id}
                                </div>
                                <div className="flex">
                                    <Typography className="font-bold">
                                        Service ID:{" "}
                                    </Typography>
                                    {id}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                        <ProfileInfoCard
                            title={serviceName}
                            details={serviceview}
                            setDetails={setServiceview}
                            editable={editable}
                            onSave={handleSave}
                            action={
                                editable ? (
                                    <Tooltip content="Close">
                                        <XMarkIcon className="h-4 w-4 cursor-pointer"
                                            onClick={() => edit()} />
                                    </Tooltip>
                                ) : (
                                    <Tooltip content="Edit">
                                        <PencilSquareIcon
                                            onClick={() => edit()}
                                            className="h-4 w-4 cursor-pointer text-blue-gray-500"
                                        />
                                    </Tooltip>
                                )
                            }
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default ServiceDetails;
