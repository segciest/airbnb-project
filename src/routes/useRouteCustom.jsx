import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../layout/NotFound/NotFound";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import UserManagement from "../pages/UserManagement/UserManagement";
import LocationManagement from "../pages/LocationManagement/LocationManagement";
import BookingManagement from "../pages/BookingManagement/BookingManagement";
import RoomManagement from "../pages/RoomManagement/RoomManagement";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
const useRouteCustom = () => {
  const route = useRoutes([
    {
      path: path.homePage,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: "*",
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <NotFound />,
        },
      ],
    },
    {
      path: path.LoginRegister,
      element: <LoginRegister />,
    },
    {
      path: path.admin.base,
      element: <AdminTemplate/>,
      children:[{
        index: true,
        element: <UserManagement/>
      },{
        path: path.admin.LocationManagement,
        element: <LocationManagement/>
      },{
        path: path.admin.BookingManagement,
        element: <BookingManagement/>
      },
    {
      path: path.admin.RoomManagement,
      element:<RoomManagement/>
    }]
    }
  ]);
  return route;
};

export default useRouteCustom;
