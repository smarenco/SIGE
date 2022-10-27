import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './DefaultLayouts.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;


const DefaultLayout = ({ component, app }) => {


  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={app.routes.map((route, i) => {
            if(!route.isPublic){
              return {
                key: i,
                icon: <UserOutlined />,
                label: <Link to={route.path}>{route.name}</Link>,
              }
          }
          })}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: window.innerHeight - 112,
          }}
        >
          {component}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;