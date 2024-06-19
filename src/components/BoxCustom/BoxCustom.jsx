import { useNavigate } from 'react-router-dom';

const BoxCustom = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const renderText = (items) => {
    // Lọc ra các items có giá trị true
    const trueItems = Object.entries(items)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    // Chuyển đổi từ tiếng Anh sang tiếng Việt
    const vietnameseText = trueItems
      .map((item) => vietnameseTranslations[item])
      .join(', ');

    return vietnameseText;
  };
  const vietnameseTranslations = {
    mayGiat: 'Máy giặt',
    banLa: 'Bàn là',
    tivi: 'Ti vi',
    dieuHoa: 'Điều hòa',
    wifi: 'Wifi',
    bep: 'Bếp',
    doXe: 'Đỗ xe',
    hoBoi: 'Hồ bơi',
    banUi: 'Bàn ủi',
  };

  return (
    <button
      onClick={() => {
        navigate(`/room-detail/${props.id}`);
      }}
    >
      <div id={props.id} className="room rounded-lg hover:">
        {/* Picture */}
        <div style={{ width: '370px' }}>
          <img
            src={props.hinhAnh}
            alt=""
            className="object-cover object-left rounded-lg roomPic"
            style={{
              width: '100%',
              height: '200px',
              // clipPath: '0 20% 0 0',
            }}
          />
        </div>

        {/* Info */}
        <div className="truncate">
          <p>Căn hộ tại khu vực {props.khuVuc}</p>
          {/* Tên phòng */}
          <h1 className="roomName truncate">{props.tenPhong}</h1>

          {/* Chi tiết phòng */}
          <div className="roomAlias">
            <p className="truncate">
              {props.khach} khách * {props.phongNgu} phòng ngủ * {props.giuong}{' '}
              giường * {props.phongTam} phòng tắm
            </p>

            {/* Dụng cụ trong phòng */}
            <p>{renderText(props)}</p>
          </div>
        </div>

        {/* Giá */}
        <div className="roomPrice">
          <p>${props.giaTien}/1 đêm</p>
        </div>
      </div>
    </button>
  );
};

export default BoxCustom;
