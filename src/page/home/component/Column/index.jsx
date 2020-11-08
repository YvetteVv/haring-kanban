import React from "react";
import {useDrop} from "react-dnd";

export const Column = ({children, className, title}) => {
    const [{isOver, canDrop}, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        // Override monitor.canDrop() function
        canDrop: (item) => {
            return true;
        },
    });

    const getBackgroundColor = () => {
        if (isOver) {
            if (canDrop) {
                return 'rgb(188,251,255)'
            } else if (!canDrop) {
                return 'rgb(255,188,188)'
            }
        } else {
            return '';
        }
    };

    return (
        <div ref={drop} className={className} style={{backgroundColor: getBackgroundColor()}}>
            <div>
                <p>{title}</p>
            </div>
            {children}
        </div>
    )
}