import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  ServerIcon,
} from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "@/pages/auth";
import { PetDetails, Pets, Services, UserDetails, Users, ServiceDetails, Dashboard } from "@/pages/dashboard/demo";
import { element } from "prop-types";
import ApprovedServices from "./pages/dashboard/demo/approved-services";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Dashboard />,
        hidden: true,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Dashboard />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Users",
        path: "/demo/users",
        element: <Users />,
      },
      {
        path: "/demo/users/user-details/:id",
        element: <UserDetails />,
        hidden: true,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Pets",
        path: "/demo/pets",
        element: <Pets />,
      },
      {
        path: "/demo/pets/pet-details/:id",
        element: <PetDetails />,
        hidden: true,
      },
      {
        icon: <ServerIcon {...icon} />,
        name: "Services",
        path: "/demo/services",
        element: <Services />,
      },
      {
        path: "/demo/services/:serviceName/:id",
        element: <ServiceDetails />,
        hidden: true,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Approved Services",
        path: "/demo/approved-services",
        element: <ApprovedServices />,
      }
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      // {
      //   icon: <RectangleStackIcon {...icon} />,
      //   name: "sign up",
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
    ],
  },
];

export default routes;
