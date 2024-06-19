import React from 'react';
import UpdatingAnimation from './../../assets/Animation/Animation_Updating.json';
import Lottie from 'lottie-react';

const SettingChat = () => {
  return (
    <div className="chat-side-bar">
      <Lottie className="mt-40" animationData={UpdatingAnimation} loop={true} />
    </div>
  );
};

export default SettingChat;
