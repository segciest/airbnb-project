import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { path } from '../../common/path';
import './AdminTemplate.scss';
import { handleGetLocalStorage } from '../../utils/util';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleTurnOffLoading,
  handleTurnOnLoading,
} from '../../redux/slice/loadingSlice';
import { Loading } from '../../components/Loading/Loading';

const { Header, Sider, Content } = Layout;
const arrMenu = [
  {
    label: <NavLink to={path.admin.base}>Quản lý người dùng</NavLink>,
    type: 'user',
    icon: <i className="fa-solid fa-users"></i>,
  },
  {
    label: (
      <NavLink to={path.admin.LocationManagement}>
        Quản thông tin vị trí
      </NavLink>
    ),
    type: 'user',
    icon: <i className="fa-solid fa-location-dot"></i>,
  },
  {
    label: (
      <NavLink to={path.admin.RoomManagement}>Quản lý thông tin phòng</NavLink>
    ),
    type: 'user',
    icon: <i className="fa-solid fa-building"></i>,
  },
  {
    label: (
      <NavLink to={path.admin.BookingManagement}>Quản lý đặt phòng</NavLink>
    ),
    type: 'user',
    icon: <i className="fa-solid fa-phone"></i>,
  },
];
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    const dataUser = handleGetLocalStorage('userData');
    if (!dataUser) {
      window.location.href = `${path.homePage}`;
    } else {
      if (dataUser.role !== 'ADMIN') {
        window.location.href = `${path.homePage}`;
      }
    }
  }, []);
  const isLoading = useSelector((state) => state.loadingSlice.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleTurnOnLoading());
    setTimeout(() => {
      dispatch(handleTurnOffLoading());
    }, 2000);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Helmet>
        <title>Airbnb - Admin</title>
      </Helmet>
      {isLoading && <Loading />}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="logo-container p-5">
          <img
            src="/img/Airbnb_Logo-12345.png"
            alt="Logo"
            className="demo-logo-vertical animate__animated animate__flip cursor-pointer"
            onClick={() => {
              navigate(path.homePage);
            }}
          />
        </div>
        <Menu
          className="custom-menu"
          style={{ fontSize: 11 }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={arrMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: ' #F08080',
            }}
          />
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow:
              '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
