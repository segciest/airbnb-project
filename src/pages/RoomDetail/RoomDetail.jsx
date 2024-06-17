import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addDays, differenceInDays } from 'date-fns';
import { phongServ } from '../../services/phongServ';
import { viTriServ } from '../../services/viTriServ';

const RoomDetail = () => {
  const [comments, setComments] = useState([]);
  const [room, setRoom] = useState({});
  const [avgRate, setAvgRate] = useState();
  const { dateRange, numPeop } = useSelector((state) => state.searchSlice);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const [bookedRangeDates, setBookedRangeDates] = useState([
    {
      startDate: addDays(new Date(), 1),
      endDate: addDays(new Date(), 8),
      key: 'selection',
    },
  ]);
  const binhLuanRef = useRef(null);

  const totalNights = useMemo(
    () =>
      differenceInDays(
        bookedRangeDates[0].endDate,
        bookedRangeDates[0].startDate
      ),
    [bookedRangeDates]
  );
  const [showPopconfirm, setShowPopconfirm] = useState(false);
  const [openBookCalendar, setOpenBookCalendar] = useState(false);
  const [usefulThings, setUsefulThings] = useState([]);
  // console.log(room);

  useEffect(() => {
    phongServ
      .getPhongById(roomId)
      .then((res) => {
        const roomData = res.data.content;
        setRoom(roomData);
        viTriServ
          .get_vitri_byId(roomData.maViTri)
          .then((res) => {
            const tempData = {
              ...res.data.content,
              tinhThanh: res.data.content.tinhThanh,
              quocGia: res.data.content.quocGia,
            };
            setRoom((prevRoom) => ({
              ...prevRoom,
              ...tempData,
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    const updatedUsefulThings = [];

    const addUsefulThing = (name, icon) => {
      updatedUsefulThings.push({ name, icon });
    };

    // const roomContent = tempData; // Assuming tempData is an object with properties like 'bep', 'wifi', etc.

    // if (roomContent.bep) {
    //   addUsefulThing('Bếp', faKitchenSet);
    // }
    // if (roomContent.wifi) {
    //   addUsefulThing('Wifi', faWifi);
    // }
    // if (roomContent.tivi) {
    //   addUsefulThing('Tivi', faTv);
    // }
    // if (roomContent.dieuHoa) {
    //   addUsefulThing('Điều hòa', faAirFreshener);
    // }
    // if (roomContent.doXe) {
    //   addUsefulThing('Bãi đỗ xe', faParking);
    // }
    // if (roomContent.banUi) {
    //   addUsefulThing('Bàn ủi', faBacon);
    // }
    // if (roomContent.hoBoi) {
    //   addUsefulThing('Hồ bơi', faSwimmingPool);
    // }
    // if (roomContent.mayGiat) {
    //   addUsefulThing('Máy giặt', faHandsWash);
    // }
    // setUsefulThings(updatedUsefulThings);
  }, [roomId]);
  return <div>RoomDetail</div>;
};

export default RoomDetail;
