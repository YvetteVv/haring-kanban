import React, {useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import {CloseOutlined} from '@ant-design/icons';
import {COLUMN_NAMES} from "../../../../constant/constants";
import classes from "./index.module.css";
import {del, put} from "../../../../utils/fetch";
import {Button, Input} from 'antd';

const Candidate = (props) => {
    const [id, setId] = useState(props.id);
    const [status, setStatus] = useState(props.status);
    const [name, setName] = useState(props.name);
    const [education, setEducation] = useState(props.education);
    const [contact, setContact] = useState(props.contact);
    const [attach, setAttach] = useState(props.attach);
    const changeItemColumn = (currentItem, columnName, statusIn) => {
        const request = {
            id,
            status: statusIn,
            name,
            education,
            contact,
            attach,
        };
        put(`/candidate/${request.id}`, request).then(() => {
            props.setItems((prevState) => {
                return prevState.map(function (e) {
                    return {
                        ...e,
                        column: e.name === currentItem.name ? columnName : e.column,
                        status: e.name === currentItem.name ? statusIn : e.status
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
                <div className={classes.top}>
                    <Button
                        size={'small'}
                        onClick={() => {
                            const request = {
                                id,
                                status,
                                name,
                                education,
                                contact,
                                attach,
                            };
                            put(`/candidate/${request.id}`, request);
                            // TODO: error handling
                        }}
                    >
                        Save
                    </Button>
                    <CloseOutlined
                        onClick={() => {
                            del(`/candidate/${id}`).then(() => {
                                props.setItems((prevState) => {
                                    const newItems = [];
                                    prevState.map(function (e) {
                                        if (e.id === id) {
                                            console.log('hit');
                                        } else {
                                            newItems.push(e);
                                        }
                                    });
                                    return newItems;
                                });
                            })
                        }}
                    />
                </div>
                <span>Name:</span>
                <Input
                    size="small"
                    placeholder=""
                    className={classes.input}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <span>Education:</span>
                <Input
                    size="small"
                    placeholder=""
                    className={classes.input}
                    value={education}
                    onChange={(e) => {
                        setEducation(e.target.value);
                    }}
                />
                <span>Email:</span>
                <Input
                    size="small"
                    placeholder=""
                    className={classes.input}
                    value={contact}
                    onChange={(e) => {
                        setContact(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}

export {Candidate};

// TODO: file
//
// <div className={classes.flex}>
//     <div>Attached File</div>
//     <Button
//         href={props.attach}
//         type="primary"
//         shape="circle"
//         icon={<DownloadOutlined/>}
//         size={'small'}
//     />
// </div>
