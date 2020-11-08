import React, {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {CloseOutlined, DownloadOutlined} from '@ant-design/icons';
import {COLUMN_NAMES} from "../../../../constant/constants";
import classes from "./index.module.css";
import {put} from "../../../../utils/fetch";
import { Input, Button, Modal } from 'antd';
const { TextArea } = Input;



const Candidate = (props) => {
    const changeItemColumn = (currentItem, columnName, status) => {
        const request = {
            id: props.id,
            status: status,
            name: props.name,
            education: props.education,
            contact: props.contact,
            attach: props.attach,

        };
        put(`/candidate/${request.id}`, request)
            .then(() => {
                props.setItems((prevState) => {
                    return prevState.map(e => {
                        return {
                            ...e,
                            column: e.name === currentItem.name ? columnName : e.column,
                            status: e.name === currentItem.name ? status : e.status
                        }
                    })
                });
            });
        // TODO: error handling
    }

    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'Our first type',
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            props.moveCardHandler(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{isDragging}, drag] = useDrag({
        item: {
            index: props.index,
            name: props.name,
            currentColumnName: props.currentColumnName,
            type: 'Our first type'
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (dropResult) {
                const {name} = dropResult;
                const {applied, phoneScreen, onSite, offered, accepted, rejected} = COLUMN_NAMES;
                switch (name) {
                    case applied:
                        changeItemColumn(item, applied, 1);
                        break;
                    case phoneScreen:
                        changeItemColumn(item, phoneScreen, 2);
                        break;
                    case onSite:
                        changeItemColumn(item, onSite, 3);
                        break;
                    case offered:
                        changeItemColumn(item, offered, 4);
                        break;
                    case accepted:
                        changeItemColumn(item, accepted, 5);
                        break;
                    case rejected:
                        changeItemColumn(item, rejected, 6);
                        break;
                    default:
                        break;
                }
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // const onChange = ({target:{value}})=>{
    //
    //
    // }

    const opacity = isDragging ? 0.4 : 1;


    drag(drop(ref));

    return (
        <div ref={ref} className={classes['movable-item']} style={{opacity}}>
            <div>
                <div className={classes.top}><Button size={'small'}>Edit</Button><CloseOutlined onClick={()=>{}}/></div>
                <span>Name:</span><Input size="small" placeholder="" className={classes.input} value={props.name} onChange ={()=>{}}/>
                <span>Education:</span><Input size="small" placeholder="" className={classes.input} value={props.education} onChange ={()=>{}}/>
                <span>Email:</span><Input size="small" placeholder="" className={classes.input} value={props.contact} onChange ={()=>{}}/>
                <div className={classes.flex}>
                    <div>Attached File</div><Button href={props.attach} type="primary" shape="circle" icon={<DownloadOutlined />} size={'small'} />
                </div>

            </div>

        </div>
    )
}

export {Candidate};
