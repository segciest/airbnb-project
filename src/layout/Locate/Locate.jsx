import React, { useEffect, useState } from 'react';
import { viTriServ } from '../../services/viTriServ';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import convertToSlug from '../../utils/convertToSlug';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../redux/slice/searchSlice';

const Locate = () => {
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    viTriServ.get_vitri_phanTrang().then((res) => {
      setCities(res.data.content.data);
    });
  }, []);

  const handleClickCityName = (city) => {
    const slug = convertToSlug(city.tinhThanh);
    dispatch(setLocation(slug));
  };
  return (
    <div className="bg-white z-[999]">
      <div className="container space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((i, d) => (

            <Link
              key={i.tinhThanh}
              to={`/rooms/${i.id}`}
              onClick={() => handleClickCityName(i)}
            >

              <Card
                hoverable
                className="w-full flex items-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-lg object-cover"
                    src={explorePlaces[d].image}
                    alt=""
                  />
                  <div>
                    <h2 className="font-bold">{i.tinhThanh}</h2>
                    <p className="text-gray-700 text-sm">
                      {explorePlaces[d].time} drive
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locate;
export const explorePlaces = [
  {
    time: '15 minute',
    image:
      'https://res.cloudinary.com/rawn/image/upload/hnevi0eqxhxjgh6skplj.webp',
  },
  {
    time: '3 hour',
    image:
      'https://res.cloudinary.com/rawn/image/upload/lbe3gpqkrwmzt98ce2nj.webp',
  },
  {
    time: '6.5 hour',
    image:
      'https://res.cloudinary.com/rawn/image/upload/xi99sldgebhfvd3n66yx.webp',
  },
  {
    time: '15 minute',
    image:
      'https://res.cloudinary.com/rawn/image/upload/hnevi0eqxhxjgh6skplj.webp',
  },
  {
    time: '7.5 hour',
    image:
      'https://res.cloudinary.com/rawn/image/upload/v1skk44cynr7gauhzb4e.webp',
  },
  {
    time: '45 minute',
    image:
      'https://res.cloudinary.com/rawn/image/upload/tqrm3cthowneesuafbp0.webp',
  },
  {
    time: '30 minute',
    image:
      'https://res.cloudinary.com/rawn/image/upload/tgt8dxlfwdh41jkptxeg.webp',
  },
  {
    time: '5 hour',
    image:
      'https://res.cloudinary.com/rawn/image/upload/bt5jrxsl5ljq5bmfqqw0.webp',
  },
];
