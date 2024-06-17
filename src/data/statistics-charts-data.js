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

const dailySalesChart = (data) => {
    return {
        type: "area",
        height: 300,
        series: [
            {
                name: "Sales",
                data: data ? data.map((e) => e.total) : [],
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
                    stops: [0, 100],
                },
            },
            stroke: {
                lineCap: "round",
            },
            markers: {
                size: 10,
            },
            yaxis: {
                ...chartsConfig.yaxis,
                categories: data
                    ? data.map((_, index) => {
                          const min = 0
                          const max = Math.max.apply(
                              Math,
                              data.map((e) => e.total),
                          );
                          const step = Math.round((max - min) / data.length);
                          return min + index * step + "k";
                      })
                    : [],
            },
            xaxis: {
                ...chartsConfig.xaxis,
                categories: data
                    ? data.map((e, index) => {
                          return new Intl.DateTimeFormat('en-US').format(new Date(e.date))
                      })
                    : [],
            },
        },
    };
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

export const statisticsChartsData = (data) => {
    return {
        color: "white",
        title: "Daily Sales",
        description: "15% increase in today sales",
        footer: "updated 1 min ago",
        chart: dailySalesChart(data),
    };
};
export default statisticsChartsData;
