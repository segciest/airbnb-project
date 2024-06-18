import React from 'react';
import { laydata } from '../../services/abc';

const ABC = () => {
  const handleInputChange = async (event) => {
    let input = event.target.value;
    // let input = 'duy';
    let data = await laydata.laydata(input);
    console.log(data);
  };
  return <input type="text" onChange={handleInputChange} />;
};

export default ABC;
