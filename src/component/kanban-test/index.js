import React from "react";
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MovableItem = () => {
    const [{ isDragging }, drag] = useDrag({
        item: { name: 'Any custom name', type: 'Irrelevant, for now' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{  opacity }}>
            We will move this item
        </div>
    )
}

const FirstColumn = () => {
    return (
        <div className={classes["first-column"]}>
            Column 1
            <MovableItem/>
        </div>
    )
}

const SecondColumn = () => {
    return (
        <div className={classes["second-column"]}>
            Column 2
        </div>
    )
}


class Kanban2React extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: 1,
            modify: false

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

                <div className={classes.mt}>
                    <div className={classes.container}>
                        <DndProvider backend={HTML5Backend}>
                            <FirstColumn/>
                            <SecondColumn/>
                        </DndProvider>
                    </div>

                </div>
            );
        }
        else{
            return null
        }

    }
}
export const Kanban2 = withRouter(Kanban2React);
