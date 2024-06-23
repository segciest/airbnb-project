import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { AlertContext } from '../../App';
import {
  handleGetValueUserData,
  handleGetValueUserToken,
} from '../../redux/slice/userSlice';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { path } from '../../common/path';
import InputText from '../../components/InputText/InputText';
import { auth } from '../../services/auth';
import { saveLocalStorage } from '../../utils/util';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {handleAlert } = useContext(AlertContext)
  //   console.log(handleAlert);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      onSubmit: async (values, { resetForm }) => {
        console.log(values);
        // khi sử dụng async await luôn có một try catch bọc lại để bắt các vấn đề về lỗi
        try {
          const res = await auth.sigin(values);
          console.log(res);
          // handleAlert('success', 'Đăng nhập thành công');
          navigate(path.homePage);
          saveLocalStorage('userData', res.data.content.user);
          saveLocalStorage('token', res.data.content.token);
          saveLocalStorage('LOGIN_USER', res.data.content);
          dispatch(handleGetValueUserData(res.data.content.user));
          dispatch(handleGetValueUserToken(res.data.content.token));
          resetForm();
        } catch (error) {
          console.log(error);
          handleAlert('error', error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        email: Yup.string().required('Vui lòng không bỏ trống'),
        password: Yup.string().required('Vui lòng không bỏ trống'),
      }),
    });
  return (
    <div className="formContainer signIn">
      <Helmet>
        <title>Airbnb - Sign In - Sign Up</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
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
        <span>or use your email password</span>
        <div className="space-y-5 w-full">
          <InputText
            label="Email"
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            placeholder="Vui lòng nhập tài khoản"
            value={values.email}
          />
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
        </div>
        <button type="submit" className="btn">
          {' '}
          Sign In{' '}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
