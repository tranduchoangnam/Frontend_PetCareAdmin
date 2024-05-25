import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import { PetDetails, Pets, Services, UserDetails, Users, ServiceDetails } from "@/pages/dashboard/demo";

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
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Demo Users",
        path: "/demo/users",
        element: <Users />,
      },
      {
        path: "/demo/users/user-details/:id",
        element: <UserDetails />,
        hidden: true,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Demo Pets",
        path: "/demo/pets",
        element: <Pets />,
      },
      {
        path: "/demo/pets/pet-details/:id",
        element: <PetDetails />,
        hidden: true,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Demo Services",
        path: "/demo/services",
        element: <Services />,
      },
      {
        path: "/demo/services/:serviceName/:id",
        element: <ServiceDetails />,
        hidden: true,
      },
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
