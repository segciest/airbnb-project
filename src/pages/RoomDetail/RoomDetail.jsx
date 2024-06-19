import {
  faAirFreshener,
  faAward,
  faBacon,
  faHandsWash,
  faKitchenSet,
  faParking,
  faSwimmingPool,
  faTv,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Image, Modal, Rate } from 'antd';
import { addDays, differenceInDays } from 'date-fns';
import { useFormik } from 'formik';
import moment from 'moment';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import * as Yup from 'yup';
import ListComment from '../../components/ListComment/ListComment';
import Rating from '../../components/Rating/Rating';
import BookCalendar from '../../layout/BookCalendar/BookCalendar';
import { setNumPeople } from '../../redux/slice/searchSlice';
import { binhLuanServ } from '../../services/binhLuanServ';
import { datPhongServ } from '../../services/datPhongServ';
import { phongServ } from '../../services/phongServ';
import { userManagement } from '../../services/userManagement';
import { viTriServ } from '../../services/viTriServ';
import { handleGetLocalStorage } from '../../utils/util';
import { AlertContext } from '../../App';
import { Helmet } from 'react-helmet';

const RoomDetail = () => {
  const [user, setUser] = useState('');
  const [comments, setComments] = useState([]);
  const [room, setRoom] = useState({});
  const [avgRate, setAvgRate] = useState();
  const { dateRange, numPeople } = useSelector((state) => state.searchSlice);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleAlert } = useContext(AlertContext);
  useEffect(() => {
    const token = handleGetLocalStorage('LOGIN_USER');
    userManagement.getUser(token?.user.id).then((res) => {
      setUser(res.data.content);
    });
  }, []);
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
    window.scrollTo(0, 0);
    async function fetchData() {
      try {
        const getIdRoom = await phongServ.getPhongById(roomId);
        const getCityNation = await viTriServ.get_vitri_byId(
          getIdRoom.data.content.maViTri
        );
        const tempData = {
          ...getIdRoom.data.content,
          tinhThanh: getCityNation.data.content.tinhThanh,
          quocGia: getCityNation.data.content.quocGia,
        };
        // console.log(tempData);
        setRoom(tempData);

        const updatedUsefulThings = [];

        const addUsefulThing = (name, icon) => {
          updatedUsefulThings.push({ name, icon });
        };

        const roomContent = tempData; // Assuming tempData is an object with properties like 'bep', 'wifi', etc.

        if (roomContent.bep) {
          addUsefulThing('Kitchen', faKitchenSet);
        }
        if (roomContent.wifi) {
          addUsefulThing('Wifi', faWifi);
        }
        if (roomContent.tivi) {
          addUsefulThing('Tivi', faTv);
        }
        if (roomContent.dieuHoa) {
          addUsefulThing('Air conditioning', faAirFreshener);
        }
        if (roomContent.doXe) {
          addUsefulThing('Parking', faParking);
        }
        if (roomContent.banUi) {
          addUsefulThing('Flat iron', faBacon);
        }
        if (roomContent.hoBoi) {
          addUsefulThing('Pool', faSwimmingPool);
        }
        if (roomContent.mayGiat) {
          addUsefulThing('Washing machine', faHandsWash);
        }
        setUsefulThings(updatedUsefulThings);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [roomId]);

  useEffect(() => {
    binhLuanServ
      .getBinhLuanById(roomId)
      .then((res) => {
        setComments(res.data.content.reverse());

        const totalSao = res.data.content.reduce(
          (sum, item) => sum + item.saoBinhLuan,
          0
        );
        if (res.data.content.length === 0) {
          setAvgRate('Chưa có đánh giá');
        } else {
          const tempNumber = totalSao / res.data.content.length;
          const formatNumber =
            tempNumber % 1 === 0
              ? tempNumber.toFixed(0)
              : tempNumber.toFixed(2);
          setAvgRate(formatNumber);
        }
      })
      .catch((err) => console.log(err));
  }, [roomId]);
  const handleBookRoom = () => {
    if (!user) {
      handleAlert('success', 'Please login!');
      return;
    }
    setShowPopconfirm(true);
  };
  const handleConfirmBooking = () => {
    // Xử lý logic đặt phòng sau khi người dùng xác nhận
    datPhongServ
      .datPhong({
        maPhong: roomId,
        ngayDen: bookedRangeDates[0].startDate,
        ngayDi: bookedRangeDates[0].endDate,
        soLuongKhach: numPeople,
        maNguoiDung: user.id,
      })
      .then((res) => {
        handleAlert('success', 'Booking success!');
        setShowPopconfirm(false);
      })
      .catch((err) =>
        // message.error(
        //   err.response.data.content.replace(/^\w/, (c) => c.toUpperCase())
        // )
        console.log(err)
      );
  };
  useEffect(() => {
    // Kiểm tra xem user có tồn tại không
    if (user) {
      // Cập nhật giá trị của maNguoiBinhLuan và token trong formik
      setFieldValue('maNguoiBinhLuan', `${user.id}`);
    }
  }, [user]);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      maPhong: roomId,
      maNguoiBinhLuan: `${user ? user.id : null}`,
      ngayBinhLuan: new Date(),
      noiDung: '',
      saoBinhLuan: 0,
    },

    onSubmit: async (values) => {
      await binhLuanServ
        .postBinhLuan(values, { resetForm })
        .then((res) => {
          handleAlert('success', 'Comment success!');
          binhLuanServ
            .getBinhLuanById(roomId)
            .then((res) => setComments(res.data.content.reverse()))
            .catch((err) => {
              console.log(err);
            });
          resetForm();
        })
        .catch((err) =>
          handleAlert(
            'error',
            err.response.data.content.replace(/^\w/, (c) => c.toUpperCase())
          )
        );
    },
    validationSchema: Yup.object({
      noiDung: Yup.string().required('Bạn chưa có nội dung đánh giá'),
    }),
  });
  return (
    <>
      <div className="pb-24 border-b-2"></div>
      <Helmet>
        <title>{room.tenPhong}</title>
      </Helmet>
      <div className="container lg:px-3 px-10 py-5 space-y-5 ">
        <h2 className=" font-bold text-3xl pt-4"> {room.tenPhong}</h2>
        <div className="grid grid-cols-1 gap-5 items-center justify-start md:flex">
          <div className="grid md:flex gap-x-6 gap-y-3">
            <div className="flex gap-x-5">
              <div className="flex gap-x-6">
                <span className="space-x-2">
                  <FontAwesomeIcon
                    className="w-4 h-4 text-[#FF5A5F]"
                    icon={faAward}
                  />
                  <span className="text-gray-600">Super host</span>
                </span>
              </div>
              <span>-</span>
              <Link
                className="underline cursor-pointer text-gray-600 hover:text-[#FF5A5F] duration-300"
                to={`/rooms/${room.id}`}
              >
                {room.tinhThanh}, {room.quocGia}
              </Link>
            </div>
            <div className="flex justify-between md:block space-x-6"></div>
          </div>
        </div>
        <div className="w-full">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper rounded-xl"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <SwiperSlide key={index} className="">
                <Image
                  src={room.hinhAnh}
                  alt=""
                  width="100%"
                  className="object-cover rounded-xl "
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="grid grid-cols-1 lg:flex gap-5">
          <div className="basis-7/12 space-y-5">
            <div className="flex justify-between items-center">
              <div className="space-y-3 ">
                <h3 className="text-xl font-bold">
                  Entire apartment. Host{' '}
                  <span className="underline uppercase">Cybersoft</span>
                </h3>
                <p>
                  {room.khach} guest • {room.tenPhong && 'Studio room •'}{' '}
                  {room.phongNgu} Bedroom • {room.giuong} bed • {room.phongTam}{' '}
                  Bathroom
                </p>
              </div>
              <div className="relative">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  alt=""
                  src="/img/logoCybersoft.png"
                />
                <div className="absolute top-7 left-7">
                  <svg
                    viewBox="0 0 14 24"
                    role="presentation"
                    aria-hidden={true}
                    focusable={false}
                    className="w-6 h-6 block fill-current"
                  >
                    <path
                      d="m10.5 20.0005065c0 1.9326761-1.56704361 3.4994935-3.5 3.4994935s-3.5-1.5668174-3.5-3.4994935c0-1.9326762 1.5670426-3.5005065 3.5-3.5005065s3.5 1.5678303 3.5 3.5005065m-9.99486248-18.58757644-.00513752 8.13836018c0 .45796416.21682079.88992936.58880718 1.17090736l5.07730539 3.831699c.4870761.367971 1.16836618.367971 1.65647028.0009994l5.08141685-3.8266984c.3719859-.2789784.5898342-.7109444.5908612-1.16790827.0010271-1.75186288.0041101-6.21051146.0051391-8.14035983 0-.50396002-.4202834-.91292822-.9392158-.91292822l-11.11643181-.00699945c-.51790391-.00099942-.93818728.40796878-.93921487.91292823"
                      fill="#fff"
                    ></path>
                    <path
                      d="m12 9.5-5-3.70124468 5-3.79875532zm-6.1292309 9.187485c-.52182677.3180834-.8707691.8762459-.8707691 1.5144379 0 .9937534.83703449 1.7980771 1.870162 1.7980771.81806646 0 1.50434636-.5065007 1.75946763-1.2095239z"
                      fill="#ffb400"
                    ></path>
                    <path d="m12 9.5-5 3.75-5-3.75v-7.5z" fill="#ff5a5f"></path>
                    <path
                      d="m7 24c-2.2060547 0-4-1.7939453-4-3.9990234 0-2.2060547 1.7939453-4.0009766 4-4.0009766s4 1.7949219 4 4.0009766c0 2.2050781-1.7939453 3.9990234-4 3.9990234zm0-7c-1.6542969 0-3 1.3466797-3 3.0009766 0 1.6533203 1.3457031 2.9990234 3 2.9990234s3-1.3457031 3-2.9990234c0-1.6542969-1.3457031-3.0009766-3-3.0009766zm.0039062-1.8242188c-.4560547 0-.9121094-.1064453-1.2617188-.3164062l-5.0458984-3.8642578c-.4697265-.3642578-.696289-.8525391-.696289-1.4951172v-8c.0009766-.3730469.1679688-.7529297.4580078-1.0429688.2900391-.2905273.6689453-.4570312 1.0410156-.4570312h.0019531 10.9990235c.7851562 0 1.5.7148438 1.5 1.5v7.9277344c-.0009766.6762695-.2421875 1.2177734-.6953125 1.5668945l-5.0009766 3.8325195c-.3505859.2333985-.8251953.3486328-1.2998047.3486328zm-5.5058593-14.1757812c-.1044922 0-.2324219.0625-.3330078.1635742-.1015625.1020508-.1650391.230957-.1650391.3374024v7.9990234c0 .3305664.0888672.5341797.3066406.703125l4.9970703 3.8310547c.3330078.1953125 1.0859375.2001953 1.4208984-.0205078l4.9716797-3.8125c.2001954-.1542969.3027344-.4155274.303711-.7749024v-7.9267578c0-.2285156-.2714844-.4995117-.5-.4995117h-11-.0009766s0 0-.0009765 0z"
                      fill="#484848"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-5 w-full h-px bg-gray-300"></div>
            <div className="space-y-5">
              <div className="flex gap-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M408 406.545V248H288v158.545ZM320 280h56v94.545h-56Z"
                  />
                  <path
                    fill="currentColor"
                    d="M271.078 33.749a34 34 0 0 0-47.066.984L32 226.745V496h112V336h64v160h272V225.958ZM448 464H240V304H112v160H64V240L249.412 57.356V57.3L448 240Z"
                  />
                </svg>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold">Whole house</h4>
                  <p className="text-sm text-gray-600 text-justify">
                    You will have your own luxury apartment.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"
                  />
                  <path
                    fill="currentColor"
                    d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28Z"
                  />
                </svg>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold">Enhanced cleaning</h4>
                  <p className="text-sm text-gray-600 text-justify">
                    This host has committed to Airbnb's 5-step enhanced cleaning
                    process.{' '}
                    <span className="underline font-bold cursor-pointer">
                      Show more
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 880 880"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M480 896V702.08A256.256 256.256 0 0 1 264.064 512h-32.64a96 96 0 0 1-91.968-68.416L93.632 290.88a76.8 76.8 0 0 1 73.6-98.88H256V96a32 32 0 0 1 32-32h448a32 32 0 0 1 32 32v96h88.768a76.8 76.8 0 0 1 73.6 98.88L884.48 443.52A96 96 0 0 1 792.576 512h-32.64A256.256 256.256 0 0 1 544 702.08V896h128a32 32 0 1 1 0 64H352a32 32 0 1 1 0-64zm224-448V128H320v320a192 192 0 1 0 384 0m64 0h24.576a32 32 0 0 0 30.656-22.784l45.824-152.768A12.8 12.8 0 0 0 856.768 256H768zm-512 0V256h-88.768a12.8 12.8 0 0 0-12.288 16.448l45.824 152.768A32 32 0 0 0 231.424 448z"
                  />
                </svg>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold">
                    Cybersoft is a Superhost
                  </h4>
                  <p className="text-sm text-gray-600 text-justify">
                    Superhosts are experienced, reputable hosts High prices and
                    who are committed to providing a stay Great for guests.
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M26 20h-6v-2h6zm4 8h-6v-2h6zm-2-4h-6v-2h6z"
                  />
                  <path
                    fill="currentColor"
                    d="M17.003 20a4.895 4.895 0 0 0-2.404-4.173L22 3l-1.73-1l-7.577 13.126a5.699 5.699 0 0 0-5.243 1.503C3.706 20.24 3.996 28.682 4.01 29.04a1 1 0 0 0 1 .96h14.991a1 1 0 0 0 .6-1.8c-3.54-2.656-3.598-8.146-3.598-8.2m-5.073-3.003A3.11 3.11 0 0 1 15.004 20c0 .038.002.208.017.469l-5.9-2.624a3.8 3.8 0 0 1 2.809-.848M15.45 28A5.2 5.2 0 0 1 14 25h-2a6.5 6.5 0 0 0 .968 3h-2.223A16.617 16.617 0 0 1 10 24H8a17.342 17.342 0 0 0 .665 4H6c.031-1.836.29-5.892 1.803-8.553l7.533 3.35A13.025 13.025 0 0 0 17.596 28Z"
                  />
                </svg>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold">
                    Free cancellation within 48 hours
                  </h4>
                </div>
              </div>
            </div>

            <div className="mb-5 w-full h-px bg-gray-300 "></div>
            <div className="w-full">
              <p className="font-bold py-3">- Describe -</p>
              <div>
                <button className="w-full text-black bg-white border-2 border-gray-300 rounded-lg py-3 hover:bg-gray-200 duration-300 flex justify-between items-center px-6">
                  <span>Translate into Vietnamese </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M20 18h-1.44a.6.6 0 0 1-.4-.12a.8.8 0 0 1-.23-.31L17 15h-5l-1 2.54a.8.8 0 0 1-.22.3a.6.6 0 0 1-.4.14H9l4.55-11.47h1.89zm-3.53-4.31L14.89 9.5a12 12 0 0 1-.39-1.24q-.09.37-.19.69l-.19.56l-1.58 4.19zm-6.3-1.58a13.4 13.4 0 0 1-2.91-1.41a11.46 11.46 0 0 0 2.81-5.37H12V4H7.31a4 4 0 0 0-.2-.56C6.87 2.79 6.6 2 6.6 2l-1.47.5s.4.89.6 1.5H0v1.33h2.15A11.23 11.23 0 0 0 5 10.7a17.2 17.2 0 0 1-5 2.1q.56.82.87 1.38a23.3 23.3 0 0 0 5.22-2.51a15.6 15.6 0 0 0 3.56 1.77zM3.63 5.33h4.91a8.1 8.1 0 0 1-2.45 4.45a9.1 9.1 0 0 1-2.46-4.45"
                    />
                  </svg>
                </button>
              </div>
              <p
                className="text-justify py-3"
                dangerouslySetInnerHTML={{ __html: room.moTa }}
              ></p>
              <span className="font-bold underline cursor-pointer">
                Show more
              </span>
            </div>
            <div className="mb-5 w-full h-px bg-gray-300 "></div>
          </div>
          <div className="basis-1/12 empty"></div>
          <div className="basis-4/12 space-y-6 sticky w-full lg:h-[350px] top-32 mb-10">
            <div className="p-6 rounded-lg border-2 border-gray-300 space-y-6 shadow-xl">
              <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="text-[#ff5a5f] font-bold">
                  <span className="text-black">${room.giaTien}</span> / night
                </div>
                <div>
                  <Rating
                    avgRate={avgRate}
                    countComment={comments?.length}
                    commentRef={binhLuanRef}
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <div
                    className="cursor-pointer grow p-3 bg-white hover:bg-gray-300 duration-300 rounded-tl-lg border-x-2 border-t-2 border-gray-300"
                    onClick={() => setOpenBookCalendar(true)}
                  >
                    <div className="font-bold">Check in</div>
                    <div>
                      {moment(bookedRangeDates[0].startDate).format(
                        'DD-MM-YYYY'
                      )}
                    </div>
                  </div>
                  <div className="grow-0"></div>
                  <div className="cursor-pointer grow p-3 bg-white hover:bg-gray-300 duration-300 rounded-tr-lg border-t-2 border-r-2 border-gray-300">
                    <div className="font-bold">Check out</div>
                    <div>
                      {moment(bookedRangeDates[0].endDate).format('DD-MM-YYYY')}
                    </div>
                  </div>
                </div>
                <div className="p-3 border-2 border-gray-300 rounded-b-lg">
                  <div className="mb-3 font-bold">Guest</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <button
                        onClick={() => {
                          if (numPeople === 1) {
                            handleAlert(
                              'warning',
                              'There must be a minimum of 1 guest!'
                            );
                          } else if (numPeople > room.khach) {
                            dispatch(setNumPeople(room.khach));
                          } else {
                            {
                              dispatch(setNumPeople(numPeople - 1));
                            }
                          }
                        }}
                        className="font-bold w-9 h-9 text-white bg-[#ff5a5f] hover:bg-[#d14146] rounded-full duration-300 flex items-center justify-center"
                      >
                        <div>–</div>
                      </button>
                    </div>
                    <div>{numPeople} guest</div>
                    <div>
                      <button
                        onClick={() => {
                          if (numPeople >= room.khach) {
                            handleAlert('warning', 'Maximum number of guests!');
                            dispatch(setNumPeople(room.khach));
                          } else {
                            dispatch(setNumPeople(numPeople + 1));
                          }
                        }}
                        className="font-bold w-9 h-9 text-white bg-[#ff5a5f] hover:bg-[#d14146] rounded-full duration-300 flex items-center justify-center"
                      >
                        <div>+</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="bg-[#ff5a5f] w-full py-3 rounded-lg font-bold text-white duration-300 hover:bg-[#d14146] "
                onClick={handleBookRoom}
              >
                Reserve
              </button>
              <p className="text-center text-gray-400">
                You won't be charged yet
              </p>
              <div className="flex justify-between items-center">
                <p className="underline text-base font-semibold">
                  ${room.giaTien} X {totalNights} nights
                </p>
                <p className="font-mono text-lg font-bold">
                  $ {room.giaTien * totalNights}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="underline text-base font-semibold">
                  Cleaning fee
                </p>
                <p className="font-mono text-lg font-bold">$ 8</p>
              </div>
              <div className="mb-5 w-full h-px bg-gray-300 "></div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">Total before taxes</p>

                <p className="font-mono text-lg font-bold">
                  ${totalNights * room.giaTien + 8}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-bold">Utilities included</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {usefulThings.map((item, d) => (
              <div key={d} className="space-x-3">
                <span>
                  <FontAwesomeIcon className="w-5 h-5" icon={item.icon} />
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              navigate('/chat');
            }}
            className="w-56 font-bold text-white bg-[#ff5a5f] rounded-lg p-3 hover:bg-[#d14146] duration-300"
          >
            Message Host
          </button>
        </div>
        {comments?.length > 0 && (
          <div ref={binhLuanRef} className="pb-[30px] "></div>
        )}
        <div className="mb-5 w-full h-px bg-gray-300 "></div>
        {user === '' ? (
          <Alert message="You need to login to comment" type="warning" />
        ) : (
          <>
            <form action="" onSubmit={handleSubmit}>
              <div>
                <div className="flex ml-3 items-center">
                  <div className="mr-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                      src={
                        user?.avatar !== ''
                          ? user?.avatar
                          : 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'
                      }
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{user?.name}</h3>
                  </div>
                </div>
                <div
                  style={{
                    padding: '0 20px',
                    marginTop: 15,
                  }}
                >
                  <Rate
                    value={values.saoBinhLuan}
                    onBlur={() => handleBlur}
                    onChange={(value) => {
                      setFieldValue('saoBinhLuan', value);
                    }}
                  />
                </div>
                <div className="mt-3 p-3 w-full">
                  <textarea
                    id="noiDung"
                    name="noiDung"
                    rows={3}
                    className="border p-2 rounded w-full"
                    placeholder="Write something..."
                    value={values.noiDung}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.noiDung && touched.noiDung ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.noiDung}
                    </p>
                  ) : null}
                </div>
                <div className="flex justify-between mx-3">
                  <div>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg text-white duration-200 bg-[#ff5a5f] hover:bg-[#d14146]"
                    >
                      Đánh giá
                    </button>
                  </div>
                  <div></div>
                </div>
              </div>
            </form>
          </>
        )}
        <div className="mb-5 w-full h-px bg-gray-300 "></div>
        <h3 className="font-bold text-xl">Bình luận</h3>
        <h3 className="font-bold text-xl">Comment</h3>
        {comments.length > 0 ? (
          <>
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 ${
                comments.length > 4 && 'h-[300px]'
              } overscroll-y-auto overflow-y-auto px-2`}
            >
              {comments.map((item, d) => (
                <ListComment key={d} item={item} />
              ))}
            </div>
          </>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
      <Modal
        title={
          <>
            <div className="flex justify-between">
              <div className="font-bold text-xl">{totalNights} night</div>
              <button
                onClick={() => {
                  setOpenBookCalendar(false);
                }}
                className="bg-gray-100 text-red-600 hover:bg-red-100 duration-200 px-2 py-3 rounded-2xl"
              >
                Close
              </button>
            </div>
          </>
        }
        footer={null}
        className="!w-max"
        open={openBookCalendar}
        onCancel={() => setOpenBookCalendar(false)}
        centered
        closable={false}
      >
        <BookCalendar
          bookedRangeDates={bookedRangeDates}
          setBookedRangeDates={setBookedRangeDates}
        />
      </Modal>
      <Modal
        footer={null}
        className="min-w-fit"
        open={showPopconfirm}
        onCancel={() => setShowPopconfirm(false)}
        centered
      >
        <>
          <div className="space-y-5 ">
            <h5 className="font-bold text-xl">
              Are you sure you want to book this room #{roomId}?
            </h5>
            <p className="">
              Date: {moment(bookedRangeDates[0].startDate).format('DD-MM-YYYY')}{' '}
              {'-'} {moment(bookedRangeDates[0].endDate).format('DD-MM-YYYY')}
            </p>
            <p>
              Accommodations: {numPeople < 10 && '0'}
              {numPeople}
            </p>
            <div className="flex justify-end">
              <button
                className="py-2 rounded-lg px-5 bg-main duration-300 bg-[#ff5a5f] hover:bg-[#d14146]  text-white font-bold"
                onClick={handleConfirmBooking}
              >
                Confirm
              </button>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default RoomDetail;
