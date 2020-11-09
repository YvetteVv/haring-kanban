import React, {createElement, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Avatar, Breadcrumb, Button, Comment, Input, Layout, Menu, Rate, Tooltip} from 'antd';
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from '@ant-design/icons';
import {get, post, put} from "../../utils/fetch";
import classes from "./index.module.css";


const {TextArea} = Input;
const {Header, Content, Footer} = Layout;

export const CandidateReview = (props) => {
    const {id} = useParams();
    //
    const [didMount, setDidMount] = useState(false);
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [contact, setContact] = useState('');
    const [status, setStatus] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [currentComment, setCurrentComment] = useState('');
    const [averageRate, setAverageRate] = useState(-1);
    const [userRate, setUserRate] = useState(0);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    //
    useEffect(() => {
        if (didMount) {
            return;
        }
        if (isNaN(Number(id))) {
            props.history.push('/home');
            return;
        }
        get(`/candidate/${id}`).then((item) => {
            // TODO: data validation to avoid exceptions
            setDidMount(true);
            setName(item.name);
            setEducation(item.education);
            setContact(item.contact);
            setStatus(item.status);
            return Promise.resolve();
        }).then(() => {
            return get(`/candidate/${id}/comment`).then((itemList) => {
                // TODO: data validation to avoid exceptions
                setCommentList(itemList);
                return Promise.resolve();
            })
        }).then(() => {
            return get(`/candidate/${id}/average-score`).then((data) => {
                // TODO: data validation to avoid exceptions
                setAverageRate(data.CountAverage);
                return Promise.resolve();
            })
        }).catch(() => {
            props.history.push('/home');
        });
    });

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
                    <div className="logo"/>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Hiring Kanban</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
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
                            {
                                commentList.map((comment) => {
                                    return (
                                        <Comment
                                            key={comment.id}
                                            actions={actions}
                                            author={<a>Palo Redon</a>}
                                            avatar={
                                                <Avatar
                                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                    alt="Han Solo"
                                                />
                                            }
                                            content={
                                                <p>{comment.content}</p>
                                            }
                                            // datetime={
                                            //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                            //         <span>{moment().fromNow()}</span>
                                            //     </Tooltip>
                                            // }
                                        />
                                    );
                                })
                            }
                        </div>
                        {
                            averageRate < 0 ? null : (
                                <div>
                                    <h3>
                                        Average rate:
                                    </h3>
                                    <Rate disabled value={averageRate}/>
                                </div>
                            )
                        }
                        <div>
                            <h2>Add comments</h2>
                            <div>
                                <TextArea
                                    showCount maxLength={100}
                                    onChange={(e) => {
                                        setCurrentComment(e.target.value)
                                    }}
                                    value={currentComment}
                                />
                            </div>
                            <Button
                                type="primary"
                                onClick={() => {
                                    post(
                                        `/candidate/${id}/comment`,
                                        {
                                            content: currentComment
                                        }
                                    ).then(() => {
                                        // TODO: data validation to avoid exceptions
                                        return get(`/candidate/${id}/comment`).then((itemList) => {
                                            setCommentList(itemList);
                                            setCurrentComment('');
                                            return Promise.resolve();
                                        })
                                    });
                                }}
                            >
                                Add comment
                            </Button>
                        </div>
                        <br/>
                        <div>
                            <h2>Rate the candidate</h2>
                            <Rate
                                style={{backgroundColor: '#1890ff'}}
                                onChange={(value) => {
                                    setUserRate(value);
                                }}
                                value={userRate}
                            />
                            <Button
                                onClick={() => {
                                    post(
                                        `/candidate/${id}/score`,
                                        {
                                            score: userRate
                                        }
                                    ).then(() => {
                                        return get(`/candidate/${id}/average-score`).then((data) => {
                                            // TODO: data validation to avoid exceptions
                                            setAverageRate(data.CountAverage);
                                            setUserRate(0);
                                            return Promise.resolve();
                                        });
                                    });
                                }}
                                style={{marginLeft: '30px'}}
                            >
                                Submit
                            </Button>
                        </div>
                        <div className={classes.flex}>
                            <Button
                                onClick={() => {
                                    put(`/candidate/${id}`, {
                                        status,
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
                                style={{marginLeft: '30px'}}
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
