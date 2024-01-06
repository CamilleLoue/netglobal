import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function DroppableColumn({col, type, id, children}) {
    const {isOver, setNodeRef} = useDroppable({
        data: {type: type, item: col},
        id: id,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };


    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}