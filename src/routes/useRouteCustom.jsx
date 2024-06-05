import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../layout/NotFound/NotFound";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import UserManagement from "../pages/UserManagement/UserManagement";

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
      path: path.admin,
      element: <AdminTemplate/>,
      children:[{
        index: true,
        element: <UserManagement/>
      }]
    }
  ]);
  return route;
};

export default useRouteCustom;
