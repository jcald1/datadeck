import Head from 'next/head'
import styles from './dataDeckLayout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import React, {useState} from 'react';
import {Layout, Menu, Breadcrumb, Tooltip} from 'antd';
import {
    DesktopOutlined,
    UploadOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

export const siteTitle = process.env.site.title;
export const siteSubTitle = process.env.site.subTitle;

export default function DataDeckLayout({children, home}) {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const rootSubmenuKeys = ['sub1', 'sub2'];

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    const onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys( openKeys );
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>

            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className={styles.logo}>
                        <img src="/images/logo.png" className={styles['logo-img']}/>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" openKeys={openKeys} onOpenChange={onOpenChange}>
                        <SubMenu inlineCollapsed={false} key="sub1" icon={<UploadOutlined/>} title="Seed Data">
                            <Menu.Item key="1">
                                <Link href="/">
                                    <a>Upload Data</a>
                                </Link>
                            </Menu.Item>
{/*                            <Menu.Item key="2">
                                <Link href="/seedData/enhance">
                                    <a>Enhance Data</a>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link href="/seedData/download">
                                    <a>Download</a>
                                </Link>
                            </Menu.Item>*/}
                        </SubMenu>
                        <Menu.Item key="4" icon={<TeamOutlined />} onClick={() =>alert('Coming Soon!')}>
                            Visualize
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className={styles['site-layout']}>
                    <Header className={styles['site-layout-header-background']} style={{padding: 0}}>
                        <span className={styles['site-layout-header-title']} >{siteTitle}</span>
                        <span className={styles['site-layout-header-subtitle']} >{siteSubTitle}</span>
                    </Header>
                    <Content style={{margin: '0 16px'}}>
{/*                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Seed Data</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>*/}
                        <div className={styles['site-layout-background']} style={{padding: 24, minHeight: 360}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>{process.env.layout.footer}</Footer>
                </Layout>
            </Layout>
            );
            }
            }
        </div>
    )
}
