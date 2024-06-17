
// import React, { useContext } from 'react'

import { useFormik } from 'formik';
import * as Yup from 'yup';

// import { AlertContext } from '../../App';
import { handleGetValueUserData } from '../../redux/slice/userSlice';
// import { saveLocalStorage } from '../../utils/utils';
import InputText from '../../components/InputText/InputText';
import { path } from '../../common/path';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../../services/auth';
import { saveLocalStorage } from '../../utils/util';
const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {handleAlert } = useContext(AlertContext)
//   console.log(handleAlert);
  const { handleBlur, handleChange, handleSubmit, values, errors, touched} =
  useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
    },
    onSubmit: async (values, { resetForm })=> {
      console.log(values);
      // khi sử dụng async await luôn có một try catch bọc lại để bắt các vấn đề về lỗi
      try {
        const res = await auth.sigin(values);
        console.log(res);
        // handleAlert('success', 'Đăng nhập thành công');
        navigate(path.homePage);
        saveLocalStorage('userData', res.data.content);
        dispatch(handleGetValueUserData(res.data.content));
        resetForm();
      } catch (error) {
        console.log(error);
        // handleAlert('error', error.response.data.content);
      }
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required('Vui lòng không bỏ trống'),
      matKhau: Yup.string().required('Vui lòng không bỏ trống'),
    }),
  });
  return (
    <div className="formContainer signIn">
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
      <div className='space-y-5 w-full'>
      <InputText
          label="Tài khoản"
          name="taiKhoan"
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.taiKhoan}
          touched={touched.taiKhoan}
          placeholder="Vui lòng nhập tài khoản"
          value={values.taiKhoan}
        />
      <InputText
          label="Mật khẩu"
          name="matKhau"
          handleChange={handleChange}
          handleBlur={handleBlur}
          error={errors.matKhau}
          touched={touched.matKhau}
          placeholder="Vui lòng nhập mật khẩu"
          value={values.matKhau}
          type="password"
        />
        
        </div>
        <button type='submit' className="btn"> Sign In </button>
    
    </form>
  </div>
  )
}

export default SignInPage
