import React from 'react';
import Lottie from 'lottie-react';
import AnimationChat from './../../assets/Animation/Animation-Chat.json';

const ChatAnimation = () => {
  return (
    <div className="flex flex-col items-center py-6 sm:mt-6 mt-40">
      <div className="w-[80%] lg:ms-14">
        <Lottie animationData={AnimationChat} loop={true} />
      </div>
      <div className="text-3xl font-bold text-center animate-bounce mt-6">
        Select User To Chat
      </div>
    </div>
  );
};

export default ChatAnimation;
