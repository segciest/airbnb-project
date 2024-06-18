import React from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../Banner/Banner';
import SearchLocation from '../SearchLocation/SearchLocation';
import DetailsList from '../DetailsList/DetailsList';
import './listRoomList.scss';

const ListRoomList = () => {
  const { maViTri } = useParams();
  console.log(maViTri);
  return (
    <>
      <Banner />
      <SearchLocation />

      <div className="listRoomLayout">
        <DetailsList />
        <div className="iframeMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.4184472557!2d106.36556595347503!3d10.755292861627074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1718703004899!5m2!1svi!2s"
            width={600}
            height={450}
            style={{ border: 0, height: '100%', width: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </>
  );
};

export default ListRoomList;
