import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import './DefaultLayouts.css';
import {
    DownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // UploadOutlined,
    UserOutlined,
    // VideoCameraOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Avatar, Button, Dropdown, Layout, Menu, message } from 'antd';
import {
    LogoutOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useAuthStore } from '../hooks/useAuthStore';
const { Header, Sider, Content } = Layout;


const DefaultLayout = ({ component, app }) => {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const { startLogout } = useAuthStore();
    
    const handleLogout = () => {
        dispatch(startLogout());
    }
    
    const items = (
        <Menu>
          <Menu.Item>Mi Perfil</Menu.Item>
          <Menu.Item onClick={handleLogout}>Salir <LogoutOutlined /></Menu.Item>
        </Menu>
      );

    const [messageApi, contextHolder] = message.useMessage();

    // const info = (message) => {
    //     messageApi.info(message);
    // };
    // const error = (message) => {
    //     messageApi.info(message);
    // };
    const success = (message) => {
        messageApi.success(message);
    };

    useEffect(() => {
        success('Bienvenide a URUSIGE');
    }, []);

    return (
        <Layout className="layout" style={{ overflow: 'hidden', height: '100vh' }}>
            {contextHolder}
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className='logo-container'>
                        {
                            collapsed ?
                                <img width={35} src={require('../../assets/logo1.png')} alt='logo-urusige' />
                                :
                                <img width={120} src={require('../../assets/logo2.png')} alt='logo-urusige' />
                        }
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={app?.routes.map((route, i) => {
                            if (!route.isPublic) {
                                return {
                                    key: i,
                                    icon: <UserOutlined />,
                                    label: <Link to={route.path}>{route.name}</Link>,
                                }
                            } else {
                                return null;
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

                        <Dropdown overlay={items}>
                            <Button type='text' style={{float: 'right', top: 15, right: 20}}>
                                <Avatar size='small' src={require('../../assets/logo1.png')} icon={<UserOutlined />} />
                                <DownOutlined /> 
                            </Button>
                        </Dropdown>
                        
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
        </Layout>
    );
};
export default DefaultLayout;