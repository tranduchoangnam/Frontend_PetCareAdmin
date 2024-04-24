import { chartsConfig } from "@/configs";
import gradient from "@material-tailwind/react/theme/components/timeline/timelineIconColors/gradient";

const websiteViewsChart = {
    type: "bar",
    height: 220,
    series: [
        {
            name: "Views",
            data: [50, 20, 10, 22, 50, 10, 40],
        },
    ],
    options: {
        ...chartsConfig,
        colors: "#388e3c",
        plotOptions: {
            bar: {
                columnWidth: "16%",
                borderRadius: 5,
            },
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
    },
};

const dailySalesChart = {
    type: "area",
    height: 300,
    series: [
        {
            name: "Sales",
            data: [50, 40, 30, 32, 50, 35, 20, 23, 50],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#4379EE"],
        fill: {
          colors: ["#4379EE"],
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0,
            opacityFrom: 0.7,
            opacityTo: 0.2,
            stops: [0, 100]
          }
        },
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 10,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "5k",
                "10k",
                "15k",
                "20k",
                "25k",
                "30k",
                "35k",
                "40k",
                "45k",
                "50k",
                "55k",
                "60k",
            ],
        },
        yaxis: {
            min: 0,
            max: 100,
            seriesName: "Sales",
            tickAmount: 5,
            labels: {
                show: true,
                align: "right",
                minWidth: 0,
                maxWidth: 160,
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                formatter: (value) => {
                    return value + "%";
                },
            },
        },
    },
};

const completedTaskChart = {
    type: "line",
    height: 220,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        ...chartsConfig,
        colors: ["#388e3c"],
        stroke: {
            lineCap: "round",
        },
        markers: {
            size: 5,
        },
        xaxis: {
            ...chartsConfig.xaxis,
            categories: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
    },
};
const completedTasksChart = {
    ...completedTaskChart,
    series: [
        {
            name: "Tasks",
            data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
    ],
};

export const statisticsChartsData = [
    {
        color: "white",
        title: "Website View",
        description: "Last Campaign Performance",
        footer: "campaign sent 2 days ago",
        chart: websiteViewsChart,
    },
    {
        color: "white",
        title: "Daily Sales",
        description: "15% increase in today sales",
        footer: "updated 4 min ago",
        chart: dailySalesChart,
    },
    {
        color: "white",
        title: "Completed Tasks",
        description: "Last Campaign Performance",
        footer: "just updated",
        chart: completedTasksChart,
    },
];

export default statisticsChartsData;
