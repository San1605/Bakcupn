import DataDrivenChat from "../pages/DataDrivenChat/DataDrivenChat";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";

export const ROUTES = [
    {
        path: "/",
        element: <Login />,
        isNavBarDisplay: false,
        isSideBarDisplay: false,
    },
    {
        path: "/data_driven_chat",
        element: <DataDrivenChat />,
        isNavBarDisplay: true,
        isSideBarDisplay: true,
    },
    {
        path: "/*",
        element: <NotFound />,
        isNavBarDisplay: false,
        isSideBarDisplay: false,
    },
];