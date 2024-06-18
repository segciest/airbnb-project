import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import NotFound404 from './../../assets/Animation/NotFound404.json';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex justify-center" style={{ height: '700px' }}>
        <Lottie
          className="cursor-pointer"
          animationData={NotFound404}
          loop={true}
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
      <div className="text-center">
        <p
          className="text-[80px] font-bold text-[#ff5a5f] animate-bounce cursor-pointer hover:text-[#c14246] transition-all duration-500"
          onClick={() => {
            navigate('/');
          }}
        >
          Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFound;
