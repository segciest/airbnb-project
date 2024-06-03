import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleTurnOnLoading,
  handleTurnOffLoading,
} from "../../redux/slice/loadingSlice";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(handleTurnOnLoading());
  //   dispatch(handleTurnOffLoading());
  // }, []);

  return (
    <div className="">
      <div className="flex justify-center" style={{ height: "600px" }}>
        <img
          className="object-contain"
          style={{ width: "600px", height: "600px" }}
          src="./src/image/notfound.png"
          alt=""
        />
      </div>
      <div className="text-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-5 py-2 bg-violet-400 cursor-pointer hover:text-white hover:bg-cyan-300 rounded-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
