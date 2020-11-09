import React, {useState, createElement} from 'react';
import { Input, Layout, Menu, Breadcrumb, Button, Comment, Tooltip, Avatar, Rate} from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import {post} from "../../utils/fetch";
import classes from "./index.module.css";
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
export const CandidateReview = (props) => {
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [contact, setContact] = useState('');
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,

    ];

    return (
        <div>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Hiring Kanban</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Kanban</Breadcrumb.Item>
                        <Breadcrumb.Item>Candidate</Breadcrumb.Item>
                        <Breadcrumb.Item>Information</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <div>
                            <h1>Information</h1>
                        </div>
                        <div>
                            <p>Name</p>
                            <TextArea showCount maxLength={100}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                value={name}

                            />
                        </div>
                        <div>
                            <p>Education</p>
                            <TextArea showCount maxLength={100}
                                onChange={(e) => {
                                    setEducation(e.target.value)
                                }}
                                value={education}

                            />
                        </div>
                        <div>
                            <p>Contact</p>
                            <TextArea showCount maxLength={100}
                                onChange={(e) => {
                                    setContact(e.target.value)
                                }}
                                value={contact}

                            />
                        </div>
                        <div>
                            //TODO: map all the comments
                            <Comment
                                actions={actions}
                                author={<a>Palo Redon</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={
                                    <p>
                                        //TODO comments
                                    </p>
                                }
                                // datetime={
                                //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                //         <span>{moment().fromNow()}</span>
                                //     </Tooltip>
                                // }
                            />
                        </div>
                        <div>
                            <h3>
                                Average rate: //TODO
                                <Rate disabled defaultValue={2} />
                            </h3>
                        </div>
                        <div>
                            <h2>Add comments</h2>
                            <div>
                                <TextArea showCount maxLength={100}
                                          onChange={(e) => {
                                              //TODO
                                          }}
                                    // value={contact}
                                />
                            </div>
                            <Button type="primary">Add comment</Button>

                        </div>
                        <br/>
                        <div>
                            <h2>Rate the candidate</h2>
                            <Rate
                                style={{backgroundColor:'#1890ff'}}
                            />

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
                                Save
                            </Button>
                            <Button
                                onClick={() => {
                                    props.history.push('/home');
                                }}
                                style={{marginLeft:'30px'}}
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
