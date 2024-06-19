import Lottie from 'lottie-react';
import loading from './../../assets/Animation/Loading.json';

export const Loading = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center fixed top-0 left-0 z-[9999999] bg-white ">
      <Lottie animationData={loading} loop={true} />
    </div>
  );
};
