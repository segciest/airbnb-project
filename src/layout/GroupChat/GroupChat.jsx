import Lottie from 'lottie-react';
import React from 'react';
import UpdatingAnimation from './../../assets/Animation/Animation_Updating.json';

const GroupChat = () => {
  return (
    <div className="chat-side-bar">
      <Lottie className="mt-40" animationData={UpdatingAnimation} loop={true} />
    </div>
  );
};

export default GroupChat;
