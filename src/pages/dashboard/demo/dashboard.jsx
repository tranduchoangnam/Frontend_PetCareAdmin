import React from "react";
import {
    Typography,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Tooltip,
    Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
    statisticsChartsData,
    projectsTableData,
    ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon, BanknotesIcon, UsersIcon, TagIcon, ServerStackIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { getCurrentRevenue, getRevenueGrowth, getRevenueHistory } from "@/utils/api/revenue";
import { getClientNumber } from "@/utils/api/user";
import { getPetNumber } from "@/utils/api/pet";
import { getRegisteredServiceNumber, getSingleServiceNumber } from "@/utils/api/service";
import { useAuth } from "@/context/AuthProvider";
import { serviceOptions, api } from "@/constants/service";

export function Dashboard() {
    const { token } = useAuth();
    const [currentRevenue, setCurrentRevenue] = useState(null);
    const [revenueGrowth, setRevenueGrowth] = useState(null);
    const [revenueHistory, setRevenueHistory] = useState(null);
    const [currentClients, setCurrentClients] = useState(null);
    const [currentPets, setCurrentPets] = useState(null);
    const [currentServices, setCurrentServices] = useState(null);
    const [serviceCount, setServiceCount] = useState([]);
    useEffect(() => {
        try {
            getCurrentRevenue({ token, serviceName: "all" }).then((res) => {
                setCurrentRevenue(res.total);
            });
            getRevenueGrowth({ token, serviceName: "all" }).then((res) => {
                setRevenueGrowth(res);
                console.log("revenue growth", res);
            });
            getRevenueHistory({ token, serviceName: "all" }).then((res) => {
                setRevenueHistory(res);
            });
            getClientNumber({ token }).then((res) => {
                setCurrentClients(res);
            });
            getPetNumber({ token }).then((res) => {
                setCurrentPets(res);
            });
            Promise.all([
                getSingleServiceNumber({ token, serviceName: "healthcare-service" }),
                getSingleServiceNumber({ token, serviceName: "grooming-service" }),
                getSingleServiceNumber({ token, serviceName: "boarding-service" }),
                getSingleServiceNumber({ token, serviceName: "appointment-service" })
            ]).then((res) => {
                console.log(res)
                setServiceCount(res);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        
    }, []);
    useEffect(() => {
        try {
            getRegisteredServiceNumber({ token }).then((res) => {
                setCurrentServices(res);
            });
        } catch (error) {
            console.error("Error fetching service number:", error);
        }
    }, []);
    return (
        <div className="mt-12">
            <div className="mb-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <StatisticsCard
                            color="gray"
                            value={currentRevenue}
                            title="Current Revenue"
                            icon={React.createElement(BanknotesIcon, {
                                className: "w-6 h-6 text-white",
                            })}
                        />
                        <StatisticsCard
                            color="gray"
                            value={currentClients}
                            title="Current Clients"
                            icon={React.createElement(UsersIcon, {
                                className: "w-6 h-6 text-white",
                            })}
                        />
                        <StatisticsCard
                            color="gray"
                            value={currentPets}
                            title="Current Pet Profiles"
                            icon={React.createElement(TagIcon, {
                                className: "w-6 h-6 text-white",
                            })}
                        />
                        <StatisticsCard
                            color="gray"
                            value={currentServices}
                            title="Registered Services"
                            icon={React.createElement(ServerStackIcon, {
                                className: "w-6 h-6 text-white",
                            })}
                        />
            </div>
            Services
                        <div className="mb-12 mt-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                        {serviceOptions.map(({value, label}, i) => {
                            return (
                                <StatisticsCard
                                    key={value+label}
                                    color="gray"
                                    value={serviceCount[i++]}
                                    title={label}
                                    icon={React.createElement(ServerStackIcon, {
                                        className: "w-6 h-6 text-white",
                                    })}
                                />
                            );
                        })}
                        </div>
            <div className="mb-6">
                <StatisticsChart
                    key={statisticsChartsData(revenueHistory).title}
                    {...statisticsChartsData(revenueHistory)}
                    footer={
                        <Typography
                            variant="small"
                            className="flex items-center font-normal text-blue-gray-600"
                        >
                            <ClockIcon
                                strokeWidth={2}
                                className="h-4 w-4 text-blue-gray-400"
                            />
                            &nbsp;{statisticsChartsData(revenueHistory).footer}
                        </Typography>
                    }
                />
            </div>  
        </div>
    );
}

export default Dashboard;
