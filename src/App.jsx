<<<<<<< HEAD
import { message } from 'antd';
import { createContext } from 'react';
import useRouteCustom from './routes/useRouteCustom';
=======
import useRouteCustom from "./routes/useRouteCustom";
import { message } from "antd";
import { createContext } from "react";
// import { Loading } from "./components/Loading/Loading";
import { useSelector } from "react-redux";
>>>>>>> uy

export const AlertContext = createContext();

function App() {
<<<<<<< HEAD
=======
  // const { isLoading } = useSelector((state) => state.loadingSlice);
>>>>>>> uy
  const [messageApi, contextHolder] = message.useMessage();
  const myRoutes = useRouteCustom();
  const handleAlert = (type, content) => {
    messageApi.open({ type, content });
  };
  return (
    <AlertContext.Provider value={{ handleAlert }}>
      {contextHolder}
<<<<<<< HEAD
=======
      {/* {isLoading && <Loading />} */}
>>>>>>> uy
      {myRoutes}
    </AlertContext.Provider>
  );
}

export default App;
