import React, {useEffect, useState} from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend} from "react-dnd-touch-backend";
import {COLUMN_NAMES} from "../../constant/constants";
import {Candidate} from "./component/Card";
import classes from "./index.module.css";
import {get} from "../../utils/fetch";
import {Column} from "./component/Column";


export const Home = (props) => {
    const [didMount, setDidMount] = useState(false);
    const [items, setItems] = useState([]);
    useEffect(() => {
        if (didMount) {
            return;
        }
        get('/candidate').then((items) => {
            // TODO: data validation to avoid exceptions
            items.map((item) => {
                switch (item.status) {
                    case 1:
                        item.column = COLUMN_NAMES.applied;
                        break;
                    case 2:
                        item.column = COLUMN_NAMES.phoneScreen;
                        break;
                    case 3:
                        item.column = COLUMN_NAMES.onSite;
                        break;
                    case 4:
                        item.column = COLUMN_NAMES.offered;
                        break;
                    case 5:
                        item.column = COLUMN_NAMES.accepted;
                        break;
                    default:
                        item.column = COLUMN_NAMES.rejected;
                        break;
                }
            })
            setDidMount(true);
            setItems(items);
        });
        // TODO: UI error tips
    });

    const isMobile = window.innerWidth < 600;

    const moveCardHandler = (dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];

        if (dragItem) {
            setItems((prevState => {
                const coppiedStateArray = [...prevState];

                // remove item by "hoverIndex" and put "dragItem" instead
                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

                // remove item by "dragIndex" and put "prevItem" instead
                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

                return coppiedStateArray;
            }));
        }
    };

    const returnItemsForColumn = (columnName) => {
        return items
            .filter((item) => item.column === columnName)
            .map((item, index) => (
                <Candidate
                    key={item.id}
                    //
                    id={item.id}
                    status={item.status}
                    name={item.name}
                    education={item.education}
                    contact={item.contact}
                    attach={item.attach}
                    //
                    currentColumnName={item.column}
                    setItems={setItems}
                    index={index}
                    moveCardHandler={moveCardHandler}
                />
            ))
    }
    const {applied, phoneScreen, onSite, offered, accepted, rejected} = COLUMN_NAMES;
    const { Header, Content, Footer } = Layout;
    return (
        <div>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Hiring Kanban</Menu.Item>
                        {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                        {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        <Breadcrumb.Item>Candidate</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <div>
                            <Button
                                shape="round"
                                icon={<PlusOutlined />}
                                size={'small'}
                                onClick={() => {
                                    props.history.push('/candidate/create');
                                }}
                            >
                                Create Candidate
                            </Button>
                            {/*<Button*/}
                                {/*size={'small'}*/}
                                {/*onClick={() => {*/}
                                    {/*props.history.push('/candidate/create');*/}
                                {/*}}*/}
                            {/*>*/}
                                {/*Create Candidate*/}
                            {/*</Button>*/}
                        </div>
                        <div className="container">
                            <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                                <Column title={applied} className={`${classes['column']} ${classes['applied-column']}`}>
                                    {returnItemsForColumn(applied)}
                                </Column>
                                <Column title={phoneScreen} className={`${classes['column']} ${classes['phone-screen-column']}`}>
                                    {returnItemsForColumn(phoneScreen)}
                                </Column>
                                <Column title={onSite} className={`${classes['column']} ${classes['on-site-column']}`}>
                                    {returnItemsForColumn(onSite)}
                                </Column>
                                <Column title={offered} className={`${classes['column']} ${classes['offered-column']}`}>
                                    {returnItemsForColumn(offered)}
                                </Column>
                                <Column title={accepted} className={`${classes['column']} ${classes['accepted-column']}`}>
                                    {returnItemsForColumn(accepted)}
                                </Column>
                                <Column title={rejected} className={`${classes['column']} ${classes['rejected-column']}`}>
                                    {returnItemsForColumn(rejected)}
                                </Column>
                            </DndProvider>
                        </div>
                    </div>
                </Content>

            </Layout>

        </div>
    );
}
