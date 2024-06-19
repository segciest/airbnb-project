import  {  useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // UploadOutlined,
    // UserOutlined,
    // VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminTemplate.scss';
import { path } from '../../common/path';
// import { handleGetLocalStorage } from '../../utils/util';
// import logo123 from '../../image/logo123.png';

  const { Header, Sider, Content } = Layout;
  const arrMenu = [{
    label : <NavLink to={path.admin.base}>Quản lý người dùng</NavLink>,
    type: "user",
    icon: <i className="fa-solid fa-users"></i>,
  },
  {
    label :<NavLink to={path.admin.LocationManagement}>Quản thông tin vị trí</NavLink>,
    type: "user",
    icon:<i className="fa-solid fa-location-dot"></i>
  },
  {
    label : <NavLink to={path.admin.RoomManagement}>Quản lý thông tin phòng</NavLink>,
    type: "user",
    icon: <i className="fa-solid fa-building"></i>
  },
  {
    label : <NavLink to={path.admin.BookingManagement}>Quản lý đặt phòng</NavLink>,
    type: "user",
    icon: <i className="fa-solid fa-phone"></i>
  },
]
const AdminTemplate = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    // useEffect(() => {
    //   const dataUser = handleGetLocalStorage("userData");
    //   if(!dataUser) {
    //     window.location.href = "https://google.com";
    //   } else{
    //     if(dataUser.role!== "ADMIN") {
    //       window.location.href = "/admin";
    //     } 
    //   }
      
    // },[]);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <div className="logo-container">
          {/* <img src={logo123} alt="Logo" className="demo-logo-vertical" /> */}
        </div>
          <Menu
          className="custom-menu"
          style={{fontSize: 11}}
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
              <div style={{ display: 'flex', alignItems: 'center', paddingRight: '20px', fontSize: '20px', color: '#F08080' }}>
  <div style={{ marginRight: '10px' }}>
    Admin
  </div>
  <NavLink to="/Login-register" className=" flex items-center">
  <button className='hover:bg-red-950' style={{padding: '10px' }}
  >
  đăng xuất
    <i className="fa fa-sign-out-alt" /> {/* This is a Font Awesome icon */}
  </button>
  </NavLink>
</div>

          </Header>
         
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
           
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    );
}

export default AdminTemplate
