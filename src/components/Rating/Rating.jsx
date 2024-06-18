import { StarFilled } from '@ant-design/icons';
import React from 'react';

const Rating = ({ commentRef, avgRate, countComment }) => {
  return (
    <span className="space-x-2 flex items-center justify-center">
      <StarFilled className="text-[#ff5a5f]" />
      <span className="text-black font-bold">{avgRate}</span>
      <span className="underline cursor-pointer text-gray-600 hover:text-main duration-300">
        ({countComment}) rating
      </span>
    </span>
  );
};

export default Rating;
