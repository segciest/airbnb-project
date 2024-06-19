import * as Yup from 'yup';
import { Field, useFormik, useFormikContext } from 'formik';
import InputText from '../../components/InputCustom/InputText';
import { DatePicker, Switch } from 'antd';
import { userManagement } from '../../services/userManagement';
import { useParams } from 'react-router-dom';
import { handleGetLocalStorage } from '../../utils/util';
import { useState } from 'react';

const FormUpdate = ({ closeModal2 }) => {
  const { idUser } = useParams();
  let [userGender, setUserGender] = useState(true);
  let user = handleGetLocalStorage('userData');
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      role: user.role,
      birthday: user.birthday,
    },
    onSubmit: async (values) => {
      console.log(values);
      userManagement
        .updateUser(idUser, values)
        .then((res) => {
          console.log(res.data.content);
          alert('Cập nhật thành công');
          closeModal2();
          window.location.reload();
        })
        .catch((err) => {
          alert('Cập nhật thất bại');
        });
    },
    validationSchema: Yup.object({
      id: Yup.string().required('Vui lòng không bỏ trống'),
      name: Yup.string().required('Vui lòng không bỏ trống'),
      email: Yup.string()
        .required('Vui lòng không bỏ trống')
        .email('Vui lòng nhập đúng định dạng email'),
      phone: Yup.string()
        .required('Vui lòng không bỏ trống')
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          'Đây không phải số điện thoại'
        ),
      gender: Yup.string().required('Vui lòng không bỏ trống'),
      role: Yup.string().required('Vui lòng không bỏ trống'),
    }),
  });
  return (
    <div className="flex items-center justify-center h-full w-2/3">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <InputText
          label="Email"
          name="email"
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.email}
          touched={touched.email}
          placeholder="Vui lòng nhập email"
          value={values.email}
        />
        <InputText
          label="Họ tên"
          name="name"
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.name}
          touched={touched.name}
          placeholder="Vui lòng nhập họ và tên"
          value={values.name}
        />
        <InputText
          label="Điện thoại"
          name="phone"
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.phone}
          touched={touched.phone}
          placeholder="Vui lòng nhập số điện thoại"
          value={values.phone}
        />
        <InputText
          label="Role"
          name="role"
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.role}
          touched={touched.role}
          placeholder="Vui lòng nhập vai trò"
          value={values.role}
        />

        {/* Birthday */}
        <div>
          <label htmlFor="" className="block mb-2">
            Ngày sinh
          </label>
          {/* về nhà validation dữ liệu của datepicker nếu người dùng chọn ngày trong quá khứ sẽ báo lỗi  */}
          <DatePicker
            format="DD-MM-YYYY"
            onChange={(date, dateString) => {
              // console.log(date);
              // console.log(dateString);
              setFieldValue('birthday', dateString);
            }}
          />
        </div>
        {/* gender */}
        <div>
          <label htmlFor="" className="block mb-2">
            Giới tính
          </label>
          <Switch
            onChange={(checked, event) => {
              console.log(checked);
              setFieldValue('gender', checked);
              setUserGender(checked);
              console.log(event.target.value);
            }}
            value={values.gender}
          />
          <span className="px-3">{userGender == true ? 'Nam' : 'Nữ'}</span>
        </div>

        <div>
          <button
            className="bg-black text-white px-5 py-2 rounded-md w-full text-center"
            type="submit"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdate;
