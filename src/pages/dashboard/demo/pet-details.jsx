import {
    Card,
    CardBody,
    Avatar,
    Typography,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import {
    PencilSquareIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getPetDetails, updatePet } from "@/utils/api/pet";
import { getRegisteredServiceByPet } from "@/utils/api/service";

export function PetDetails() {
    const { token } = useAuth();
    const [ownerId, setOwnerId] = useState(null);
    const [petDetails, setPet] = useState(null);
    const [petview, setPetview] = useState(null);
    const [editable, setEditable] = useState(false);
    const [allServices, setServices] = useState([]);
    const { id } = useParams();

    const edit = () => {
        setEditable(!editable);
    };

    const handleSave = async (d) => {
        const { owner, ...r } = d;
        const data = { ownerId, ...r };
        try {
            updatePet({ token, data, id }).then(() => {
                getPetDetails({ token }).then((res) => setPet(res));
            });
        } catch (error) {
            console.error("err update pet", error);
        }
    };
    useEffect(() => {
        try {
            getPetDetails({ token, id }).then((res) => {
                const { owner, ...r } = res;
                setPet(r);
                const { avatar, ownerId, id, ...view } = r;
                const v = { ...view, owner: owner.username };
                setOwnerId(ownerId);
                setPetview(v);
                // console.log(res);
            });
        } catch (error) {
            console.error("Error fetching pet data:", error);
        }
    }, []);

    useEffect(() => {
        try {
            getRegisteredServiceByPet({ token, id }).then((res) => {
                setServices(res);
                console.log(res);
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
                                src={petDetails?.avatar}
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography className="font-bold ">
                                    {petDetails?.breed}
                                </Typography>
                                <div className="flex">
                                    <Typography className="font-bold">
                                        ID:
                                    </Typography>
                                    {petDetails?.id}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 xl:grid-cols-2">
                        <ProfileInfoCard
                            title="Profile Information"
                            details={petview}
                            editable={editable}
                            onSave={handleSave}
                            setDetails={setPetview}
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
                        <div className="px-5">
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="mb-2"
                            >
                                Registered Services
                            </Typography>
                            {allServices ? (
                                <div className="mt-6">
                                    {allServices.map(
                                        ({ serviceName, services }) =>
                                            services && (
                                                <div key={serviceName}>
                                                    <Typography
                                                        variant="h6"
                                                        color="blue-gray"
                                                        className="mt-4"
                                                    >
                                                        {serviceName}:
                                                    </Typography>

                                                    {services.length > 0 ? (
                                                        <div>
                                                            {services.map(({ id, date }) => (
                                                                <div key={id} className="flex items-center gap-6 mb-4">
                                                                    <Typography
                                                                        variant="h6"
                                                                        color="blue-gray"
                                                                        className="font-normal text-blue-gray-500"
                                                                    >
                                                                        {new Date(date).toLocaleDateString('en-GB', {
                                                                            day: '2-digit',
                                                                            month: 'short',
                                                                            year: 'numeric',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: false,
                                                                            timeZone: 'UTC'
                                                                        })} UTC
                                                                    </Typography>
                                                                    <a
                                                                        href={`/dashboard/demo/services/${serviceName.replace(/ /g, '-')}/${id}`}
                                                                    >
                                                                        <Button color="lightBlue" size="sm" ripple="light">
                                                                            View
                                                                        </Button>
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <Typography
                                                            variant="small"
                                                            className="font-normal text-blue-gray-500"
                                                        >
                                                            No available service
                                                        </Typography>
                                                    )}
                                                </div>
                                            ),
                                    )}
                                </div>
                            ) : (
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-500"
                                >
                                    No service registered
                                </Typography>
                            )}
                        </div>
                    </div>
                    {/* Pets */}
                </CardBody>
            </Card>
        </>
    );
}

export default PetDetails;
