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
import { getCurrentRevenue, getRevenueGrowth } from "@/utils/api/revenue";
import { getClientNumber } from "@/utils/api/user";
import { getPetNumber } from "@/utils/api/pet";
import { getRegisteredServiceNumber, getSingleServiceNumber } from "@/utils/api/service";
import { useAuth } from "@/context/AuthProvider";
import { serviceOptions, api } from "@/constants/service";

export function Dashboard() {
    const { token } = useAuth();
    const [currentRevenue, setCurrentRevenue] = useState(null);
    const [revenueGrowth, setRevenueGrowth] = useState(null);
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
                            footer={
                                <Typography className="font-normal text-blue-gray-600">
                                    <strong className="text-green-500">
                                    +{revenueGrowth}
                                    </strong>
                                    &nbsp;today
                                </Typography>
                            }
                        />
                        <StatisticsCard
                            color="gray"
                            value={currentClients}
                            title="Current Clients"
                            icon={React.createElement(UsersIcon, {
                                className: "w-6 h-6 text-white",
                            })}
                            footer={
                                <Typography className="font-normal text-blue-gray-600">
                                    <strong className="text-green-500">
                                        +50%
                                    </strong>
                                    &nbsp;today
                                </Typography>
                            }
                        />
                        <StatisticsCard
                            color="gray"
                            value={currentPets}
                            title="Current Pet Profiles"
                            icon={React.createElement(TagIcon, {
                                className: "w-6 h-6 text-white",
                            })}
                            footer={
                                <Typography className="font-normal text-blue-gray-600">
                                    <strong className="text-green-500">
                                        +50%
                                    </strong>
                                    &nbsp;today
                                </Typography>
                            }
                        />
                        <StatisticsCard
                            color="gray"
                            value={currentServices}
                            title="Registered Services"
                            icon={React.createElement(ServerStackIcon, {
                                className: "w-6 h-6 text-white",
                            })}
                            footer={
                                <Typography className="font-normal text-blue-gray-600">
                                    <strong className="text-green-500">
                                        +50%
                                    </strong>
                                    &nbsp;today
                                </Typography>
                            }
                        />
            </div>
            Services
                        <div className="mb-12 mt-6 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                        {serviceOptions.map(({value, label}, i) => {
                            return (
                                <StatisticsCard
                                    color="gray"
                                    value={serviceCount[i++]}
                                    title={label}
                                    icon={React.createElement(ServerStackIcon, {
                                        className: "w-6 h-6 text-white",
                                    })}
                                    footer={
                                        <Typography className="font-normal text-blue-gray-600">
                                            <strong className="text-green-500">
                                                +50%
                                            </strong>
                                            &nbsp;today
                                        </Typography>
                                    }
                                />
                            );
                        })}
                        </div>
            <div className="mb-6">
                <StatisticsChart
                    key={statisticsChartsData[1].title}
                    {...statisticsChartsData[1]}
                    footer={
                        <Typography
                            variant="small"
                            className="flex items-center font-normal text-blue-gray-600"
                        >
                            <ClockIcon
                                strokeWidth={2}
                                className="h-4 w-4 text-blue-gray-400"
                            />
                            &nbsp;{statisticsChartsData[1].footer}
                        </Typography>
                    }
                />
            </div>
            <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
                {statisticsChartsData.map((props) => (
                    <StatisticsChart
                        key={props.title}
                        {...props}
                        footer={
                            <Typography
                                variant="small"
                                className="flex items-center font-normal text-blue-gray-600"
                            >
                                <ClockIcon
                                    strokeWidth={2}
                                    className="h-4 w-4 text-blue-gray-400"
                                />
                                &nbsp;{props.footer}
                            </Typography>
                        }
                    />
                ))}
            </div>
            <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 flex items-center justify-between p-6"
                    >
                        <div>
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="mb-1"
                            >
                                Projects
                            </Typography>
                            <Typography
                                variant="small"
                                className="flex items-center gap-1 font-normal text-blue-gray-600"
                            >
                                <CheckCircleIcon
                                    strokeWidth={3}
                                    className="h-4 w-4 text-blue-gray-200"
                                />
                                <strong>30 done</strong> this month
                            </Typography>
                        </div>
                        <Menu placement="left-start">
                            <MenuHandler>
                                <IconButton
                                    size="sm"
                                    variant="text"
                                    color="blue-gray"
                                >
                                    <EllipsisVerticalIcon
                                        strokeWidth={3}
                                        fill="currenColor"
                                        className="h-6 w-6"
                                    />
                                </IconButton>
                            </MenuHandler>
                            <MenuList>
                                <MenuItem>Action</MenuItem>
                                <MenuItem>Another Action</MenuItem>
                                <MenuItem>Something else here</MenuItem>
                            </MenuList>
                        </Menu>
                    </CardHeader>
                    <CardBody className="px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead>
                                <tr>
                                    {[
                                        "companies",
                                        "members",
                                        "budget",
                                        "completion",
                                    ].map((el) => (
                                        <th
                                            key={el}
                                            className="border-b border-blue-gray-50 py-3 px-6 text-left"
                                        >
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-medium uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {projectsTableData.map(
                                    (
                                        {
                                            img,
                                            name,
                                            members,
                                            budget,
                                            completion,
                                        },
                                        key,
                                    ) => {
                                        const className = `py-3 px-5 ${key === projectsTableData.length - 1
                                            ? ""
                                            : "border-b border-blue-gray-50"
                                            }`;

                                        return (
                                            <tr key={name}>
                                                <td className={className}>
                                                    <div className="flex items-center gap-4">
                                                        <Avatar
                                                            src={img}
                                                            alt={name}
                                                            size="sm"
                                                        />
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-bold"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={className}>
                                                    {members.map(
                                                        (
                                                            { img, name },
                                                            key,
                                                        ) => (
                                                            <Tooltip
                                                                key={name}
                                                                content={name}
                                                            >
                                                                <Avatar
                                                                    src={img}
                                                                    alt={name}
                                                                    size="xs"
                                                                    variant="circular"
                                                                    className={`cursor-pointer border-2 border-white ${key ===
                                                                        0
                                                                        ? ""
                                                                        : "-ml-2.5"
                                                                        }`}
                                                                />
                                                            </Tooltip>
                                                        ),
                                                    )}
                                                </td>
                                                <td className={className}>
                                                    <Typography
                                                        variant="small"
                                                        className="text-xs font-medium text-blue-gray-600"
                                                    >
                                                        {budget}
                                                    </Typography>
                                                </td>
                                                <td className={className}>
                                                    <div className="w-10/12">
                                                        <Typography
                                                            variant="small"
                                                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                                                        >
                                                            {completion}%
                                                        </Typography>
                                                        <Progress
                                                            value={completion}
                                                            variant="gradient"
                                                            color={
                                                                completion ===
                                                                    100
                                                                    ? "green"
                                                                    : "blue"
                                                            }
                                                            className="h-1"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
                <Card className="border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="m-0 p-6"
                    >
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="mb-2"
                        >
                            Orders Overview
                        </Typography>
                        <Typography
                            variant="small"
                            className="flex items-center gap-1 font-normal text-blue-gray-600"
                        >
                            <ArrowUpIcon
                                strokeWidth={3}
                                className="h-3.5 w-3.5 text-green-500"
                            />
                            <strong>24%</strong> this month
                        </Typography>
                    </CardHeader>
                    <CardBody className="pt-0">
                        {ordersOverviewData.map(
                            ({ icon, color, title, description }, key) => (
                                <div
                                    key={title}
                                    className="flex items-start gap-4 py-3"
                                >
                                    <div
                                        className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${key ===
                                            ordersOverviewData.length - 1
                                            ? "after:h-0"
                                            : "after:h-4/6"
                                            }`}
                                    >
                                        {React.createElement(icon, {
                                            className: `!w-5 !h-5 ${color}`,
                                        })}
                                    </div>
                                    <div>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="block font-medium"
                                        >
                                            {title}
                                        </Typography>
                                        <Typography
                                            as="span"
                                            variant="small"
                                            className="text-xs font-medium text-blue-gray-500"
                                        >
                                            {description}
                                        </Typography>
                                    </div>
                                </div>
                            ),
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;
