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
import { getServiceDetails } from "@/utils/api/service";

export function ServiceDetails() {    
    const [serviceDetails, setService] = useState(null);
    const [pet, setPet] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const { serviceName, id } = useParams();
    // console.log(serviceName, id)

    useEffect(() => {
        try {
            getServiceDetails({ token, id, serviceName }).then((res) => {
                const { pet, ...service } = res;
                setService(service);
                setPet(pet);
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
                                <Typography className="font-normal text-blue-gray-600">
                                    {pet?.breed}
                                </Typography>
                                <Typography>id: {pet?.id}</Typography>
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
                            title={serviceName}
                            details={serviceDetails}
                            action={
                                <Tooltip content="Edit Profile">
                                    <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                                </Tooltip>
                            }
                        />
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default ServiceDetails;
