import React, {useState} from 'react';
import {Breadcrumb, Button, Input, Layout, Menu} from 'antd';
import {post} from "../../utils/fetch";
import classes from "./index.module.css";

const {TextArea} = Input;
const {Header, Content, Footer} = Layout;
export const CandidateCreate = (props) => {
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [contact, setContact] = useState('');
    return (
        <div>
            <Layout className="layout">
                <Header>
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Hiring Kanban</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Kanban</Breadcrumb.Item>
                        <Breadcrumb.Item>Candidate</Breadcrumb.Item>
                        <Breadcrumb.Item>Create</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <div>
                            <h1>Create Candidate</h1>
                        </div>
                        <div>
                            <p>Name</p>
                            <TextArea
                                showCount maxLength={100}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                value={name}
                            />
                        </div>
                        <div>
                            <p>Education</p>
                            <TextArea
                                showCount maxLength={100}
                                onChange={(e) => {
                                    setEducation(e.target.value)
                                }}
                                value={education}
                            />
                        </div>
                        <div>
                            <p>Contact</p>
                            <TextArea
                                showCount maxLength={100}
                                onChange={(e) => {
                                    setContact(e.target.value)
                                }}
                                value={contact}
                            />
                        </div>
                        <div>
                            <p></p>
                        </div>
                        <div className={classes.flex}>
                            <Button
                                onClick={() => {
                                    post('/candidate', {
                                        status: 1,
                                        name,
                                        education,
                                        contact,
                                        attach: 'https://www.google.com/'
                                    }).then(() => {
                                        props.history.push('/home');
                                    })
                                    // TODO: error handling
                                }}
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={() => {
                                    props.history.push('/home');
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        </div>
    );
}
