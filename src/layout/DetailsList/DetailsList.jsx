import './detailList.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoomAsyncThunk } from '../../redux/slice/listRoomSlice';
import BoxCustom from '../../components/BoxCustom/BoxCustom';
const DetailsList = () => {
  const { maViTri } = useParams();
  const dispatch = useDispatch();
  const { arrRoom } = useSelector((state) => state.listRoomSlice);
  console.log(maViTri);

  useEffect(() => {
    dispatch(getRoomAsyncThunk(maViTri));
    console.log(arrRoom);
  }, []);
  return (
    <div className="listRoom">
      {arrRoom?.map((item, index) => {
        return (
          <BoxCustom
            {...item}
            khuVuc={maViTri}
            title={'Toàn bộ căn hộ dịch vụ ở'}
            key={index}
          />
        );
      })}{' '}
    </div>
  );
};

export default DetailsList;
