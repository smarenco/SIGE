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
import { Link, NavLink } from "react-router-dom";
import { Button, Layout, Menu } from 'antd';
import { API_URL, APP_PATH } from '../../env';
import { ACCESS_TOKEN } from '../common/consts';

const { Header, Sider, Content } = Layout;


    const DefaultLayout = ({ component, app }) => {

    const renderRightMenu = (items) => {
        return this.renderMenu(items).map(item => {
            item.props.style.float = 'right';
            item.props.style.borderRadius = 3;
            return item;
        });
    }

    const renderMenu = (items) => {
        return items.map((item, index, arr) => {
            const props = { key: item.key };
            if (item.isDivider === true) {
                return <Menu.Divider {...props} />;
            }
            const text = !!item.icon ? <><Icon type={item.icon} className={`${item.text === undefined ? 'only-icon' : ''}`} /><span>{item.text}</span></> : <><span>{item.text}</span></>;
            if (item.key.indexOf('chk') === 0) {
                if (!hasPermission(item.key)) {
                    return undefined;
                }
            }
            if (Array.isArray(item.items)) {
                props.title = !!item.to ? <NavLink to={APP_PATH + item.to}>{text}</NavLink> : text;
                props.children = this.renderMenu(item.items);
                if (props.children.filter(el => !!el).length === 0) {
                    return undefined;
                }
                return <Menu.SubMenu style={{}} {...props} />;
            } else {
                props.title = item.title;
                props.children = !!item.to ? <NavLink to={APP_PATH + item.to}>{text}</NavLink> : text;
                return <Menu.Item style={{}} {...props} onClick={e => this.setMenuKey([item.key])} />;
            }
        }).filter(el => !!el).map((item, index, arr) => {
            if (!!item && item.key.indexOf('divider') === 0) {
                if (index === 0 || index + 1 === arr.length) {
                    return undefined;
                }
            }
            return item;
        });
    }

    const [collapsed, setCollapsed] = useState(false);
  
    return (
        <Layout className="layout" style={{ overflow: 'hidden', height: '100vh' }}>
            <Header>
                <Menu theme='dark' style={{ backgroundColor: 'transparent', paddingTop: 8 }}>
                    {renderRightMenu(this.props.app.menu.mainRight)}
                    <Menu.Item style={{ float: 'left' }} onClick={e => this.setMenuKey(['empresa'])}>
                        {collapsed ? <MenuUnfoldOutlined className='trigger' onClick={() => setCollapsed(!collapsed)}/> : <MenuFoldOutlined className='trigger' onClick={() => setCollapsed(!collapsed)}/>}
                    </Menu.Item>
                </Menu>

                
            </Header>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={app?.routes.map((route, i) => {
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