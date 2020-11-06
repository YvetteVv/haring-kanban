import React from "react";
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import Board from '@lourenci/react-kanban'



class KanbanReact extends React.Component {
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
        const board = {
            columns: [
                {
                    id: 1,
                    title: 'Backlog',
                    cards: [
                        {
                            id: 1,
                            title: 'Add card',
                            description: 'Add capability to add a card in a column'
                        },
                    ]
                },
                {
                    id: 2,
                    title: 'Doing',
                    cards: [
                        {
                            id: 2,
                            title: 'Drag-n-drop support',
                            description: 'Move a card between the columns'
                        },
                    ]
                }
            ]
        };
        if(this.state.render === 1){
            return (

                <div className={classes.mt}>

                    <Board initialBoard={board} />
                </div>
            );
        }
        else{
            return null
        }

    }
}
export const Kanban = withRouter(KanbanReact);
