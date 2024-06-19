import { useRoutes } from 'react-router-dom';
import { path } from '../common/path';
import HomeTemplate from '../templates/HomeTemplate/HomeTemplate';
import HomePage from '../pages/HomePage/HomePage';
import NotFound from '../layout/NotFound/NotFound';
import AdminTemplate from '../templates/AdminTemplate/AdminTemplate';
import UserManagement from '../pages/UserManagement/UserManagement';
import LocationManagement from '../pages/LocationManagement/LocationManagement';
import BookingManagement from '../pages/BookingManagement/BookingManagement';
import RoomManagement from '../pages/RoomManagement/RoomManagement';
import RoomLocate from '../pages/RoomLocate/RoomLocate';
import RoomLocateTemplate from '../templates/RoomLocateTemplate/RoomLocateTemplate';
import ListRoomTemplate from '../templates/ListRoomTemplate/ListRoomTemplate';
import ListRoom from '../layout/ListRoom/ListRoom';
import RoomDetailTemplate from '../templates/RoomDetailTemplate/RoomDetailTemplate';
import RoomDetail from '../pages/RoomDetail/RoomDetail';
import InfoUser from '../layout/InfoUser/InfoUser';
import LoginRegister from '../pages/LoginRegister/LoginRegister';
import ChatTemplate from '../templates/ChatTemplate/ChatTemplate';
import ChatPage from '../pages/ChatPage/ChatPage';
import Messenger from '../layout/Messenger/Messenger';
import ListRoomList from '../layout/ListRoomList/ListRoomList';
import LoginRegisterTemplate from '../templates/LoginRegisterTemplate/LoginRegisterTemplate';

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
      path: path.detail.base,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <ListRoomList />,
        },
      ],
    },
    {
      path: path.about,
      element: <HomeTemplate />,
      children: [
        {
          index: true,
          element: <InfoUser />,
        },
      ],
    },
    {
      path: path.admin.base,
      element: <AdminTemplate />,
      children: [
        {
          index: true,
          element: <UserManagement />,
        },
        {
          path: path.admin.LocationManagement,
          element: <LocationManagement />,
        },
        {
          path: path.admin.BookingManagement,
          element: <BookingManagement />,
        },
        {
          path: path.admin.RoomManagement,
          element: <RoomManagement />,
        },
      ],
    },
    {
      path: path.rooms.base,
      element: <ListRoomTemplate />,
      children: [
        {
          index: true,
          element: <ListRoom />,
        },
      ],
    },
    {
      path: path.rooms.listRoom,
      element: <RoomLocateTemplate />,
      children: [
        {
          index: true,
          element: <RoomLocate />,
        },
      ],
    },
    {
      path: path.rooms.detail,
      element: <RoomDetailTemplate />,
      children: [
        {
          index: true,
          element: <RoomDetail />,
        },
      ],
    },
    {
      path: path.LoginRegister,
      element: <LoginRegisterTemplate />,
      children: [
        {
          index: true,
          element: <LoginRegister />,
        },
      ],
    },
    {
      path: path.admin.base,
      element: <AdminTemplate />,
      children: [
        {
          index: true,
          element: <UserManagement />,
        },
        {
          path: path.admin.LocationManagement,
          element: <LocationManagement />,
        },
        {
          path: path.admin.BookingManagement,
          element: <BookingManagement />,
        },
        {
          path: path.admin.RoomManagement,
          element: <RoomManagement />,
        },
      ],
    },
    {
      path: path.chat,
      element: <ChatTemplate />,
      children: [
        {
          index: true,
          element: <ChatPage />,
        },
        {
          path: path.chat,
          element: <Messenger />,
        },
      ],
    },
    {
      path: '*',
      index: true,
      element: <NotFound />,
    },
  ]);
  return route;
};

export default useRouteCustom;
