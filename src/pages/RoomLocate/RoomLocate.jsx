import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MapLocation from '../../components/MapLocation/MapLocation';
import RoomsLocate from '../../layout/RoomsLocate/RoomsLocate';
import SearchLocation from '../../layout/SearchLocation/SearchLocation';
import { phongServ } from '../../services/phongServ';
import { viTriServ } from '../../services/viTriServ';
import { Helmet } from 'react-helmet';

const RoomLocate = () => {
  const [roomCity, setRoomCity] = useState([]);
  const [cityNoSlug, setCityNoSlug] = useState(null);
  const { dateRange, numPeop } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();
  const { cityId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    viTriServ.get_vitri_byId(cityId).then((res) => {
      setCityNoSlug(res.data.content.tinhThanh);
    });
    phongServ.getPhongTheoViTri(cityId).then((res) => {
      setRoomCity(res.data.content);
    });
  }, [dateRange]);
  return (
    <>
      <div
        className="pt-36 pb-32 text-center"
        data-aos="zoom-in-up"
        data-aos-duration="1500"
      >
        <Helmet>
          <title>{`Airbnb - ${cityNoSlug}`}</title>
        </Helmet>
        <h1 className="text-3xl font-bold text-[#ff5a5f] py-5">
          <span>
            <i
              className="fa-brands fa-airbnb"
              data-aos="flip-left"
              data-aos-duration="1500"
              data-aos-delay="900"
            ></i>{' '}
            Airbnb - Welcome to VietNam!
          </span>
        </h1>
        <p className="text-2xl font-semibold">{cityNoSlug}</p>
      </div>
      <SearchLocation />
      <div className="mx-auto container grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="py-12 space-y-3 h-auto">
          <>
            <p>
              There are {roomCity.length ?? 0} accommodations in {cityNoSlug} •{' '}
              {dayjs(dateRange[0].startDate).format('DD/MM/YYYY')} –{' '}
              {dayjs(dateRange[0].endDate).format('DD/MM/YYYY')}
            </p>
            <h1 className="font-bold text-3xl text-black">
              Accommodation in the selected map area
            </h1>

            <div className="space-y-6">
              {roomCity?.map((i, index) => (
                <RoomsLocate item={i} city={cityNoSlug} />
              ))}
            </div>
          </>
        </div>
        <div className="h-screen w-full block sticky top-28 mt-16">
          <MapLocation locationInfo={cityNoSlug} />
        </div>
      </div>
    </>
  );
};

export default RoomLocate;
