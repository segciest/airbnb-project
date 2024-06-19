import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoAsyncThunk } from '../../redux/slice/userInfoSlice';
import { Button, Modal } from 'antd';
import Banner from '../Banner/Banner';
import './infoUser.scss';
import { getUserOrderAsyncThunk } from '../../redux/slice/userOrderRoomSlice';
// import { getUserOrderDetailAsyncThunk } from '../../redux/slice/orderedRoomSlice';
import BoxCustom from '../../components/BoxCustom/BoxCustom';
import { userManagement } from '../../services/userManagement';
import FormUpdate from '../FormUpdate/FormUpdate';

const InfoUser = () => {
  let { idUser } = useParams();
  console.log(idUser);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoSlice);
  const { userOrder } = useSelector((state) => state.userOrderRoomSlice);
  // State để lưu trữ thông tin phòng đã thuê
  const [rooms, setRooms] = useState([]);

  // state modal - cập nhật ảnh
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAvater, setSelectedAvater] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // state modal - chỉnh sử hồ sơ
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = () => {
    setIsModalOpen2(true);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };

  // Gọi dữ liệu của phòng
  const roomCheck = async (maPhong) => {
    let data = await userManagement.getOrderRoomDetail(maPhong);
    return data;
  };

  // uploadPic
  const handleFileChange = (event) => {
    const img = event.target.files[0];
    console.log(img);

    if (img) {
      const urlImg = URL.createObjectURL(img);
      setSelectedFile(urlImg);
      setSelectedAvater(img);
    }
  };

  const handleUpload = () => {
    // let file = event.target.files[0];
    // console.log(file);
    let formData = new FormData();
    formData.append('formFile', selectedAvater);
    console.log(formData);
    userManagement
      .updateAvatar(formData)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    // Nếu thành công di chuyển hàm này lên .then()
    handleCancel();
  };

  // didmount
  useEffect(() => {
    dispatch(getUserInfoAsyncThunk(idUser));
    console.log(userInfo);
    dispatch(getUserOrderAsyncThunk(idUser));
    // dispatch(getUserOrderDetailAsyncThunk())
  }, []);

  // useEffect để gọi chi tiết phòng đã thuê
  useEffect(() => {
    const fetchRooms = async () => {
      if (userOrder) {
        const roomDetails = await Promise.all(
          userOrder.map((item) => roomCheck(item.maPhong))
        );
        console.log(roomDetails);
        setRooms(roomDetails);
      }
    };
    fetchRooms();
  }, [userOrder]);
  return (
    <>
      {/* banner */}
      <div
        className="pt-36 pb-32 text-center"
        data-aos="zoom-in-up"
        data-aos-duration="1500"
      >
        <h1
          style={{ margin: '0 auto' }}
          className="text-3xl font-bold text-[#ff5a5f] py-5"
        >
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
      {/* layout */}
      <div className="infoLayout">
        {/* Thông tin */}
        <div
          style={{ width: '400px' }}
          className="layout1 max-w-sm  p-4 border rounded-lg text-center bg-white shadow-md"
        >
          <img
            className="w-24 h-24 rounded-full mx-auto mb-4"
            src={userInfo.avatar}
            alt="Profile"
          />
          {/* <button className="text-blue-500 underline mt-2">Cập nhật ảnh</button> */}
          <Button type="primary" onClick={showModal}>
            Cập nhật ảnh
          </Button>
          <Modal
            title="Cập nhật ảnh"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="modal">
              <div className="modal-content">
                <h2>Thay Đổi Ảnh Đại Diện</h2>
                <img
                  className="w-40 rounded-full mx-auto mb-5"
                  src={selectedFile}
                  alt=""
                />
                <form action="">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    className="px-5 py-2 bg-violet-400 rounded-lg text-white hover:bg-violet-500"
                    onClick={() => {
                      handleUpload();
                    }}
                  >
                    Upload Avatar
                  </button>
                </form>
              </div>
            </div>
          </Modal>
          <h2
            style={{
              fontSize: '20px',
              lineHeight: '28px',
            }}
            className="text-lg font-medium mt-4 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5 text-green-500 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Xác minh danh tính
          </h2>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '22px',
            }}
            className="text-sm text-gray-600 mt-2"
          >
            Xác minh danh tính của bạn với huy hiệu xác minh danh tính.
          </p>
          <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
            Nhận huy hiệu
          </button>
          <div className="border-t my-4"></div>
          <div className="text-left">
            {userInfo.email != null ? (
              <h3
                style={{ fontSize: '20px', lineHeight: '28px' }}
                className="text-base font-medium"
              >
                ADMIN ĐÃ XÁC NHẬN
              </h3>
            ) : (
              <h3
                style={{ fontSize: '20px', lineHeight: '28px' }}
                className="text-base font-medium"
              >
                VUI LÒNG XÁC NHẬN
              </h3>
            )}
            <p
              style={{
                fontSize: '14px',
                lineHeight: '22px',
              }}
              className="text-green-500 mt-1"
            >
              ✓ Địa chỉ email
            </p>
          </div>
        </div>
        {/* extra */}
        <div className="layout2">
          <h1
            style={{
              fontSize: '20px',
              lineHeight: '28px',
            }}
            className="mb-3"
          >
            Xin chào ! {userInfo.name}
          </h1>
          {/* chỉnh sửa hồ sơ */}
          <Button className="mb-3" type="primary" onClick={showModal2}>
            Cập nhật hồ sơ
          </Button>
          <Modal
            title="Chỉnh sửa hồ sơ"
            open={isModalOpen2}
            onOk={handleOk2}
            onCancel={handleCancel2}
          >
            <FormUpdate closeModal2={handleOk2} />
          </Modal>
          {/* Phòng đã thuê */}
          <div>
            <h1
              style={{
                fontSize: '24px',
                lineHeight: '32px',
              }}
              className="mb-3"
            >
              Phòng đã thuê
            </h1>
            {rooms != '' ? (
              <div className="listRoom">
                {rooms?.map((item, index) => {
                  // console.log(item);
                  return (
                    <BoxCustom {...item.data.content} khuVuc={''} key={index} />
                  );
                })}
              </div>
            ) : (
              <p>Bạn chưa đặt phòng</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoUser;
