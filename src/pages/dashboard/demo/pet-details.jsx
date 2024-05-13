import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Avatar,
    Typography,
    Tabs,
    TabsHeader,
    Tab,
    Switch,
    Tooltip,
    Button,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getPetDetails, getRegisteredService } from "@/utils/api/pet";

export function PetDetails() {
    const auth = useAuth();
    const [petDetails, setPet] = useState(null);
    const [allServices, setServices] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const { id } = useParams();

    useEffect(() => {
        try {
            getPetDetails({ token, id }).then((res) => {
                setPet(res);
                // console.log(res);
            });
        } catch (error) {
            console.error("Error fetching pet data:", error);
        }
    }, []);

    useEffect(() => {
        try {
            getRegisteredService({ token, id }).then((res) => {
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
                                <Typography className="font-normal text-blue-gray-600">
                                    {petDetails?.breed}
                                </Typography>
                                <Typography>id: {petDetails?.id}</Typography>
                            </div>
                        </div>
                        <div className="w-96">
                            <Tabs value="app">
                                <TabsHeader>
                                    <Tab value="app">
                                        <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        App
                                    </Tab>
                                    <Tab value="message">
                                        <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                                        Message
                                    </Tab>
                                    <Tab value="settings">
                                        <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                                        Settings
                                    </Tab>
                                </TabsHeader>
                            </Tabs>
                        </div>
                    </div>
                    <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                        <ProfileInfoCard
                            title="Profile Information"
                            details={{
                                name: petDetails?.name,
                                age: petDetails?.age.toString(),
                                color: petDetails?.color,
                                gender: petDetails?.gender,
                                breed: petDetails?.breed,
                                ownerId: petDetails?.ownerId,
                            }}
                            action={
                                <Tooltip content="Edit Profile">
                                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                                </Tooltip>
                            }
                        />
                    </div>
                    {/* Pets */}
                    <div className="px-4 pb-4">
                        <Typography
                            variant="h6"
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
                                                
                                                {services.length > 0 ? (<div>
                                                    {services.map(
                                                        ({ serviceId, date }) => (
                                                            <div
                                                                key={serviceId}
                                                                className="flex items-center gap-6"
                                                            >
                                                                <Typography
                                                                    variant="h6"
                                                                    color="blue-gray"
                                                                    className="mb-2 font-normal text-blue-gray-500"
                                                                >
                                                                    {date}
                                                                </Typography>
                                                                <Button
                                                                    color="lightBlue"
                                                                    size="sm"
                                                                    ripple="light"
                                                                >
                                                                    View
                                                                </Button>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>) : (<Typography
                                                    variant="small"
                                                    className="font-normal text-blue-gray-500"
                                                >
                                                    No available service
                                                </Typography>)}
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
                </CardBody>
            </Card>
        </>
    );
}

export default PetDetails;
