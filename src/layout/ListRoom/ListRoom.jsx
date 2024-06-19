import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { phongServ } from '../../services/phongServ';
import SearchLocation from '../SearchLocation/SearchLocation';
import dayjs from 'dayjs';
import CardList from '../CardList/CardList';
import { Helmet } from 'react-helmet';

const ListRoom = () => {
  const { dateRange, locateAt, numPeop } = useSelector((state) => {
    return state.searchSlice;
  });
  const [listRoom, setListRoom] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    phongServ.getListPhong().then((res) => {
      setListRoom(res.data.content);
    });
  }, [numPeop]);
  return (
    <>
      <div
        className="pt-36 pb-32 text-center"
        data-aos="zoom-in-up"
        data-aos-duration="1500"
      >
        <Helmet>
          <title>{`Airbnb | Vacation rentals, cabins, beach houses, & more`}</title>
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
      </div>
      <SearchLocation />
      <>
        <div className="container mt-5 py-5">
          <p className="mb-5 font-bold">
            There are {listRoom.length ?? 0} places to stay at
            {locateAt} • {dayjs(dateRange[0].startDate).format('DD/MM/YYYY')} –{' '}
            {dayjs(dateRange[0].endDate).format('DD/MM/YYYY')}
          </p>
          <div className="grid lg:grid-cols-3 2xl:grid-cols-5 md:grid-cols-3 smm:grid-cols-1 gap-5">
            {listRoom.length > 0 ? (
              listRoom.map((i, d) => (
                <CardList
                  key={d}
                  tenPhong={i.tenPhong}
                  hinhAnh={i.hinhAnh}
                  giaTien={i.giaTien}
                  moTa={i.moTa}
                  id={i.id}
                />
              ))
            ) : (
              <div className="col-span-5">
                <h1 className=" text-center text-md">
                  Hiện tại không thể tìm thấy phòng bạn cần tìm
                </h1>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default ListRoom;
