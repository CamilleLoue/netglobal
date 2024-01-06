import React from 'react';
import {useDrop} from "react-dnd";

export function DroppableColumn({col, type, id, children, handleDrop}) {
    const [, drop] = useDrop({
        accept: 'TRANSACTIONS',
        data: {type: type, item: col},
        id: id,
        drop: (item) => {
            console.log('HAA')
            handleDrop(item, col)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });


    return (
        <div ref={drop} >
            {children}
        </div>
    );
}