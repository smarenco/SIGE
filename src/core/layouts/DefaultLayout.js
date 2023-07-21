import React, { useEffect, useState } from 'react';
// import 'antd/dist/antd.css';
import './DefaultLayouts.css';
import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    // UploadOutlined,
    UserOutlined,
    // VideoCameraOutlined,
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Avatar, Button, Dropdown, Layout, Menu, message, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useAuthStore } from '../hooks/useAuthStore';
import { MENU } from '../common/consts';
const { Header, Sider, Content } = Layout;


const DefaultLayout = ({ component, app }) => {
    const dispatch = useDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const { startLogout } = useAuthStore();

    const handleLogout = () => {
        dispatch(startLogout());
    }

    const handleMyProfile = (e) => {
        console.log(e);
    }

    let menuProps = JSON.parse(localStorage.getItem(MENU));

    if(!menuProps){
        menuProps = [];
    }

    const itemsDropdown = [
        {
            label: 'Mi Perfil',
            key: '1',
            icon: <UserOutlined />,
            onClick: handleMyProfile
        },
        {
            label: 'Cerrar Sesión',
            key: '2',
            icon: <LogoutOutlined />,
            onClick: handleLogout
        }
    ];

    const dropdownProps = {
        items: itemsDropdown
    };

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
                <Sider style={{overflow:'auto'}} trigger={null} collapsible collapsed={collapsed}>
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
                        defaultSelectedKeys={['0']}
                        items={menuProps.map((r, i) => {
                            const route = app.routes.filter(route => route.key === r.key)[0];
                            if (!route.isPublic) {
                                return {
                                    key: i,
                                    icon: route?.icon,
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
                        <Space wrap style={{ float: 'right', top: 10, marginRight: 20 }}>
                            <Dropdown menu={dropdownProps} >
                                <Button type='text' >
                                    <Avatar size='small' style={{ transform: 'translateY(-2px)' }} src={require('../../assets/logo1.png')} icon={<UserOutlined />} />
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
                        </Space>
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: window.innerHeight - 100,
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