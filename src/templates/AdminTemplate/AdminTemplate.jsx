import React, { useState } from 'react';
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
  const { Header, Sider, Content } = Layout;
  const arrMenu = [{
    label : <NavLink>Quản lý người dùng</NavLink>,
    type: "user",
    icon: <i className="fa-solid fa-users"></i>
  },
  {
    label :<NavLink>Quản thông tin vị trí</NavLink>,
    type: "user",
    icon:<i className="fa-solid fa-location-dot"></i>
  },
  {
    label : <NavLink>Quản lý thông tin phòng</NavLink>,
    type: "user",
    icon: <i className="fa-solid fa-building"></i>
  },
  {
    label : <NavLink>Quản lý đặt phòng</NavLink>,
    type: "user",
    icon: <i className="fa-solid fa-phone"></i>
  },
]
const AdminTemplate = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
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
            }}
          >
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    );
}

export default AdminTemplate
