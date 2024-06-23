import { useContext } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AlertContext } from '../../App';
import { path } from '../../common/path';
import InputText from '../../components/InputText/InputText';
import { auth } from '../../services/auth';

import { handleGetValueUserData } from '../../redux/slice/userSlice';
import { saveLocalStorage } from '../../utils/util';
import { Helmet } from 'react-helmet';
// import { handleGetValueUserData } from '../../redux/slice/userSlice';
// import { handleGetValueUserData } from '../../redux/slice/userSlice';
const SignupPage = () => {
  // const resetForm = useFormik()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { handleAlert } = useContext(AlertContext);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        phone: '',
      },
      onSubmit: async (values, { resetForm }) => {
        console.log(values);
        resetForm({ values: '' }); // Clear the form

        // khi sử dụng async await luôn có một try catch bọc lại để bắt các vấn đề về lỗi
        try {
          const res = await auth.signup(values);
          console.log(res);
          handleAlert('success', 'Đăng ký thành công');
          navigate(path.LoginRegister);
          saveLocalStorage('userData', res.data.content.token);
          dispatch(handleGetValueUserData(res.data.content));
        } catch (error) {
          console.log(error);
          handleAlert('error', error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('Vui lòng nhập email')
          .required('Vui lòng nhập email'),
        password: Yup.string().required('Vui lòng không bỏ trống'),
        name: Yup.string()
          .required('Vui lòng nhập họ và tên')
          .matches(
            /^[a-zA-Z\s'\-ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]+$/g,
            'Vui lòng nhập họ tên là chữ'
          ),
        phone: Yup.string()
          .required('Vui lòng không bỏ trống')
          .matches(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            'Đây không phải số điện thoại'
          ),
      }),
    });

  return (
    <div className="container mx-auto w-full px-4">
    <div className="formContainer signUp ">
      <form onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <div className="formIcon">
          <a>
            <i className="fa-brands fa-square-facebook"></i>
          </a>
          <a>
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a>
            <i className="fa-brands fa-google-plus-g"></i>
          </a>
          <a>
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a>
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
        <span>or use your email for registeration</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full text-black ">
          <div>
            <InputText
              label="Tài khoản"
              name="name"
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              placeholder="Vui lòng nhập tài khoản"
              value={values.name}
            />
          </div>
          <div>
            <InputText
              label="Email"
              name="email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder="Vui lòng nhập email"
              value={values.email}
              type="email"
            />
          </div>
        </div>
        <div className="w-full">
          <InputText
            label="Mật khẩu"
            name="password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            placeholder="Vui lòng nhập mật khẩu"
            value={values.password}
            type="password"
          />
          <InputText
            label="Số điện thoại"
            name="phone"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            placeholder="Vui lòng nhập số điện thoại"
            Value={values.phone}
          />
        </div>
        <button className="btn" type="submit">
          {' '}
          Sign Up{' '}
        </button>
      </form>
    </div>
    </div>
  );
};

export default SignupPage;
