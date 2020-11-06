import React from "react";
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import { Link, Route } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

class HeaderReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render:1,
            modify:false

        }
    }
    //在componentDidMount生命周期中添加window的handleScroll滑动监听事件
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

//定义handleScroll事件函数
    handleScroll =(e)=>{
        let header = document.getElementById('header'); //定义一个dom节点为'header'的header变量
        if(window.pageYOffset >= 80){  //if语句判断window页面Y方向的位移是否大于或者等于导航栏的height像素值
            header.classList.add('header_bg');  //当Y方向位移大于80px时，定义的变量增加一个新的样式'header_bg'
        } else {
            header.classList.remove('header_bg'); //否则就移除'header_bg'样式
        }
    }

    // componentDidMount() {
    //     const option={
    //         method:'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //         }
    //     };
    //     fetch(`${db}/models/lesson/`,option)
    //         .then(response=>response.json())
    //         .then(res=>{
    //             this.setState({
    //                 lesson:res,
    //                 render:1
    //
    //             });
    //         })
    // }

    render() {

            return (

                <div>
                    <div>
                        <Layout>
                            <div className={classes.header} id="header">
                                Kanban
                                {/*<div className="brand">*/}
                                    {/*<Link to="/">*/}
                                        {/*1*/}
                                    {/*</Link>*/}
                                {/*</div>*/}
                                {/*<div className={classes.nav}>*/}
                                    {/*<ul>*/}
                                        {/*<li>*/}
                                            {/*<Link to="/technology">*/}
                                            {/*2*/}
                                            {/*</Link>*/}
                                        {/*</li>*/}
                                        {/*<li>*/}
                                            {/*<Link to="/case">*/}
                                                {/*3*/}
                                            {/*</Link>*/}
                                        {/*</li>*/}
                                        {/*<li>*/}
                                            {/*<Link to="/about">*/}
                                                {/*4*/}
                                            {/*</Link>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                {/*</div>*/}
                            </div>

                            {/*<Content className="content" id="content">*/}
                                {/*<Route path="/" exact component={ Home }/>*/}
                                {/*<Route path="/technology" component={ CoreTechnology }/>*/}
                                {/*<Route path="/case" component={ Case }/>*/}
                                {/*<Route path="/about" component={ About }/>*/}
                                {/*<Route path="/join" component={ Join }/>*/}
                            {/*</Content>*/}
                        </Layout>
                    </div>

                </div>
            );
        }

}
export const Header = withRouter(HeaderReact);
