import React, {useState} from "react";
import {withRouter} from 'react-router-dom';
import classes from './index.module.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const finalSpaceCharacters = [
//     {
//         id: 'gary',
//         name: 'Gary Goodspeed',
//         thumb: '/images/gary.png'
//     },
//     {
//         id: 'cato',
//         name: 'Little Cato',
//         thumb: '/images/cato.png'
//     },
//     {
//         id: 'kvn',
//         name: 'KVN',
//         thumb: '/images/kvn.png'
//     },
//     {
//         id: 'mooncake',
//         name: 'Mooncake',
//         thumb: '/images/mooncake.png'
//     },
//     {
//         id: 'quinn',
//         name: 'Quinn Ergon',
//         thumb: '/images/quinn.png'
//     }
// ]
// const [characters, updateCharacters] = useState(finalSpaceCharacters);
// function handleOnDragEnd(result) {
//     if (!result.destination) return;
//
//     const items = Array.from(characters);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);
//
//     updateCharacters(items);
// }

class KanbanReact extends React.Component {
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
                    {/*<DragDropContext onDragEnd={handleOnDragEnd}>*/}
                    {/*<Droppable droppableId="characters">*/}
                        {/*{(provided) => (*/}
                            {/*<ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>*/}
                                {/*{characters.map(({id, name, thumb}, index) => {*/}
                                    {/*return (*/}
                                        {/*<Draggable key={id} draggableId={id} index={index}>*/}
                                            {/*{(provided) => (*/}
                                                {/*<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>*/}
                                                    {/*<div className="characters-thumb">*/}
                                                        {/*<img src={thumb} alt={`${name} Thumb`} />*/}
                                                    {/*</div>*/}
                                                    {/*<p>*/}
                                                        {/*{ name }*/}
                                                    {/*</p>*/}
                                                {/*</li>*/}
                                            {/*)}*/}
                                        {/*</Draggable>*/}
                                    {/*);*/}
                                {/*})}*/}
                                {/*{provided.placeholder}*/}
                            {/*</ul>*/}
                        {/*)}*/}
                    {/*</Droppable>*/}
                {/*</DragDropContext>*/}

                </div>
            );
        }
        else{
            return null
        }

    }
}
export const Kanban = withRouter(KanbanReact);
