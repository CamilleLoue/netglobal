import { useDrag, useDrop } from 'react-dnd';
import {Item} from "@/app/dashboard/add-data/Item";
const DraggableColumn = ({ transactions, col, index }) => {


    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TRANSACTIONS',
        previewOptions: {},
        item: { index, col},
/*        end: () => {
            setHoveredItem(null)
        },*/
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));


    const [, drop] = useDrop({
        accept: 'TRANSACTIONS',
    });

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div
                className="bg-gray-800 border border-black p-6 m-2"
            >
                {transactions.map((transaction, index) =>
                    (
                        <Item key={index} id={transaction.id} item={transaction.values[col].toString()}/>
                    ))}
            </div>
        </div>
    );
};

export default DraggableColumn;
