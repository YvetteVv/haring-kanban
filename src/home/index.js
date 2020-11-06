import React from "react";
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import {Kanban} from "../component/kanban";
import {Header} from "../component/header";
import {Nav} from "../component/nav";


class HomeReact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render:1,
            modify:false

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
        if(this.state.render === 1){
            return (

                <div>
                    <Header/>
                    <Kanban/>
                </div>
            );
        }
        else{
            return null
        }
    }
}
export const Home = withRouter(HomeReact);
