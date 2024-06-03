import { useRoutes } from "react-router-dom";
import { path } from "../common/path";
import HomeTemplate from "../templates/HomeTemplate/HomeTemplate";
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../layout/NotFound/NotFound";

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
  ]);
  return route;
};

export default useRouteCustom;
