import { Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  A11y,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './RoomsLocate.scss';


const RoomsLocate = ({ item, city }) => {
  const [usefulThings, setUsefulThings] = useState([]);
  useEffect(() => {
    const updatedThings = [];

    const addThing = (condition, label) => {
      if (condition) {
        updatedThings.push(label);
      }
    };

    addThing(item.wifi, 'Wifi');
    addThing(item.bep, 'Kitchen');
    addThing(item.dieuHoa, 'Air conditioning');
    addThing(item.mayGiat, 'Washing machine');
    addThing(item.tivi, 'Tivi');
    addThing(item.doXe, 'Parking');
    addThing(item.hoBoi, 'Pool');

    setUsefulThings(updatedThings);
  }, [item]);
  return (
    <>
      <div className="space-y-6">
        <div className=" duration-300 mb-5">
          <Link to={`/room-detail/${item.id}`}>
            <Card style={{ borderRadius: 20 }} hoverable data-aos="zoom-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Swiper
                    slidesPerView={1}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[
                      Navigation,
                      Pagination,
                      A11y,
                      Keyboard,
                      Mousewheel,
                    ]}
                    className="roomSwiper-locate relative h-48 rounded-lg"
                  >
                    <button className="absolute top-3 left-3 z-30">
                      <div className="rounded-xl px-3 py-2 bg-white/90 duration-200">
                        Guest favorite
                      </div>
                    </button>
                    {Array.from({ length: 5 }, (_, index) => (
                      <SwiperSlide key={index}>
                        <img
                          className="object-cover "
                          style={{ objectPosition: '10%' }}
                          src={item.hinhAnh}
                          alt=""
                        />
                      </SwiperSlide>
                    ))}
                    <button className="absolute top-3 right-3 z-30">
                      <svg
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        focusable="false"
                        style={{
                          display: 'block',
                          fill: 'rgba(0, 0, 0, 0.5)',
                          height: '24px',
                          width: '24px',
                          stroke: '#fff',
                          strokeWidth: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
                      </svg>
                    </button>
                  </Swiper>
                </div>
                <div>
                  <div>
                    <div className="relative">
                      <p className="text-gray-500 text-md truncate">
                        Entire serviced apartments at {city}
                      </p>
                      <p className="truncate text-xl">{item.tenPhong}</p>
                    </div>
                    <div className="w-[15%] bg-gray-300 h-[3px] rounded-lg my-2"></div>
                    <p className="text-gray-500 text-md truncate">
                      {item.khach} guest
                      {item.tenPhong.toLowerCase().includes('studio') &&
                        '• Studio room'}
                      {item.phongNgu > 0 && ' • ' + item.phongNgu + ' Bedroom'}
                      {item.giuong > 0 && ' • ' + item.phongNgu + ' Bed'}
                      {item.phongTam > 0 && ' • ' + item.phongNgu + ' Bathroom'}
                    </p>
                    <p className="text-gray-500 text-md truncate">
                      {usefulThings.map((item, index) => {
                        return (
                          <span key={index}>
                            {item}
                            {index === usefulThings.length - 1 ? '' : ' • '}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                  <div className="text-right mt-12 text-[#ff5a5f]">
                    <span className="font-bold text-black">
                      $ {item.giaTien}
                    </span>{' '}
                    / night
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoomsLocate;
