import * as Yup from 'yup';
import { useFormik } from 'formik';
import InputText from '../../components/InputCustom/InputText';
import { Switch } from 'antd';
import { userManagement } from '../../services/userManagement';
import { useParams } from 'react-router-dom';

const FormUpdate = ({ closeModal2 }) => {
  const { idUser } = useParams();
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
      id: idUser,
      name: '',
      email: '',
      phone: '',
      gender: true,
      role: '',
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        userManagement.updateUser(idUser, values).then((res) => {
          console.log(res.data.content);
          alert('Cập nhật thành công');
        });
        closeModal2();
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert('Cập nhật thất bại');
      }
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
        {/* gender */}
        <div>
          <label htmlFor="" className="block mb-2">
            Gender
          </label>
          <Switch
            onChange={(checked) => {
              console.log(checked);
              setFieldValue('gender', checked);
              // console.log(event.target.value);
            }}
            value={values.gender}
          />
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
