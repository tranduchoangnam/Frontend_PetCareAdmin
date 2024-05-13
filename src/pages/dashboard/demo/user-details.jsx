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
    Chip,
} from "@material-tailwind/react";
import {
    HomeIcon,
    ChatBubbleLeftEllipsisIcon,
    Cog6ToothIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import { Link, useParams } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getUserDetails } from "@/utils/api/user";
// import { userDetails, allPets } from "@/data/test";
import { getAllPetsOfOwner } from "@/utils/api/pet";

export function UserDetails() {
    const auth = useAuth();
    const [userDetails, setUser] = useState(null);
    const [allPets, setPets] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const { id } = useParams();

    useEffect(() => {
        try {
            getUserDetails({ token, id }).then((res) => {
                setUser(res);
                console.log(res);
            });
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }, []);

    useEffect(() => {
        try {
            getAllPetsOfOwner({ token, id }).then((res) => {
                setPets(res);
                console.log(res);
            });
        } catch (error) {
            console.error("Error fetching user:", error);
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
                                src={userDetails?.avatar}
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                            <div>
                                <Typography className="font-normal text-blue-gray-600">
                                    <Chip
                                        variant="gradient"
                                        color={
                                            userDetails?.role == "admin"
                                                ? "green"
                                                : "blue-gray"
                                        }
                                        value={userDetails?.role}
                                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                    />
                                </Typography>
                                <Typography>id: {userDetails?.id}</Typography>
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
                                username: userDetails?.username,
                                mobile: userDetails?.phone,
                                email: userDetails?.email,
                                location: userDetails?.address || "N/A",
                                gender: userDetails?.gender,
                                role: userDetails?.role,
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
                            Pets
                        </Typography>
                        {allPets ? (
                            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
                                {allPets.map(
                                    ({
                                        name,
                                        age,
                                        color,
                                        gender,
                                        breed,
                                        avatar,
                                    }) => (
                                        <Card
                                            key={name}
                                            color="transparent"
                                            shadow={false}
                                        >
                                            <CardHeader
                                                floated={false}
                                                color="gray"
                                                className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                                            >
                                                <img
                                                    src={avatar}
                                                    alt={name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </CardHeader>
                                            <CardBody className="py-0 px-1">
                                                <Typography
                                                    variant="small"
                                                    className="font-normal text-blue-gray-500"
                                                >
                                                    {breed}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    color="blue-gray"
                                                    className="mt-1 mb-2"
                                                >
                                                    {name}
                                                </Typography>
                                            </CardBody>
                                            <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                                                <Button
                                                    variant="outlined"
                                                    size="sm"
                                                >
                                                    view pet
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ),
                                )}
                            </div>
                        ) : (
                            <Typography
                                variant="small"
                                className="font-normal text-blue-gray-500"
                            >
                                No available pets
                            </Typography>
                        )}
                    </div>
                </CardBody>
            </Card>
        </>
    );
}

export default UserDetails;
