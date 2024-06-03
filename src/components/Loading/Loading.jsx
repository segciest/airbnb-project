import Lottie from "lottie-react";
import loading from "./../../assets/Animation/Loading.json";

export const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center top-0 left-0 bg-gray-200 bg-opacity-30">
      <Lottie animationData={loading} loop={true} />
    </div>
  );
};
