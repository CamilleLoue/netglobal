"use client";
import { useState } from "react";
import Papa from "papaparse";
import apiClient from "@/libs/api";
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableColumn from "@/app/dashboard/add-data/DraggableColumn";
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {DndProvider} from "react-dnd";
import {DroppableColumn} from "@/app/dashboard/add-data/DroppableColumn";
import {Item} from "@/app/dashboard/add-data/Item";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";


const defaultTransactions = [{id: 0, 'values': {'0': '24/02/2023', '1': 'Store', '2': 25.26}},
  {id: 1, 'values': {'0': '24/03/2023', '1': 'Store 2', '2': 23.26}}]

const targetValues = [{'column': 'Date', 'values': []}, {'column': 'Name', 'values': []}, {'column': 'Amount', 'values': []}]


export default function AddData() {
  const [csvFile, setCsvFile] = useState(null);
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [columns, setColumns] = useState(['0', '1', '2']);
  const [targets, setTargets] = useState(targetValues);


  const handleCsvUpload = (e) => {
    console.log('hi')
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleAddData = async () => {
    console.log('hi')
    if (!csvFile) {
      console.error("No CSV file uploaded.");
      return;
    }

    Papa.parse(csvFile, {
      header: false,
      skipEmptyLines: true,
      complete: function (results) {
        let valuesArray = [];
        results.data.map((d) => {
          valuesArray.push(Object.values(d));
        });
        const longestRowLength = valuesArray.reduce((max, item) => {
          return Math.max(max, item.length);
        }, 0);
        let columns = []
        for (let i = 0; i < longestRowLength; i++) {
          columns.push(i.toString())
        }
        console.log(columns)
        setColumns(columns)
        console.log(valuesArray)
        const newTransactions = []
        valuesArray.forEach(item => {
          while (item.length < longestRowLength) {
            item.push(' ')
          }
        })
        valuesArray.forEach((transaction, index) => {
          newTransactions.push({id: index, 'values': transaction})
        })
        console.log(newTransactions)
        setTransactions(newTransactions)
      }});


/*    try {
      const text = await csvFile.text(); // Read the CSV file as text
      const { data } = Papa.parse(text, { header: true }); // Parse CSV into JSON with headers

      for (const row of data) {
        const {
          "Bank Name": bank_name,
          "Account Type": account_type,
          "Transaction Date": transaction_date,
          "Description": description,
          "Amount": amount,
          "Currency": currency,
          "Balance": balance,
        } = row;
        console.log("Sending data:", {
          bank_name: bank_name,
            account_type: account_type,
            transaction_date: transaction_date,
            description: description,
            amount: parseFloat(amount),
            currency: currency,
            balance: parseFloat(balance),
        });
        await apiClient.post("/transactions", [
          {
            bank_name: bank_name,
            account_type: account_type,
            transaction_date: transaction_date,
            description: description,
            amount: parseFloat(amount),
            currency: currency,
            balance: parseFloat(balance),
          },
        ]);
      }
    } catch (error) {
      console.error("Error while adding transactions:", error);
    }*/
  };

  const columnMap = ['Date', "Name", "Amount", "Category"]

  const handleDrop = (droppedItem) => {
    console.log(droppedItem)
    const { source, destination } = droppedItem;
    console.log(destination)
    console.log(source)
    // Ignore drop outside droppable container
    if (!destination || destination.index < 0 || destination.index > columns.length + 4) return;
    if (source.droppableId === destination.droppableId) {
      const updatedList = [...columns];
      // Remove dragged item
      const [reorderedItem] = updatedList.splice(source.index-4, 1);
      // Add dropped item
      updatedList.splice(droppedItem.destination.index-4, 0, reorderedItem);
      // Update State
      setColumns(updatedList);
    }
    else {
      if (destination.index < 0 || destination.index > 3) return
      const newTargets = [...targets]
      const vals = transactions.map(transaction => {
        return {id: transaction.id, value: transaction.values[droppedItem.draggableId]}
      })
      newTargets[destination.index] = {'column': columnMap[destination.index], 'values': vals}
      console.log(newTargets)
      setTargets(newTargets)
      const updatedList = [...columns];
      const removed = updatedList.splice(source.index-4, 1);
      setColumns(updatedList);
    }

  };

  const handleDragStart = () => {
    console.log('drag start')
  };

  const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          distance: 8,
        },
      })
  )

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">Add Data</h1>

        <form>
          <div className="mb-4">
            <label
              htmlFor="csvFile"
              className="block font-medium text-gray-700"
            >
              Upload CSV File
            </label>
            <input
              type="file"
              id="csvFile"
              name="csvFile"
              accept=".csv"
              onChange={handleCsvUpload}
              className="form-input"
            />
          </div>
          <button
            type="button"
            onClick={handleAddData}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Transactions
          </button>
        </form>
      </section>
      <DndProvider backend={HTML5Backend}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDrop}>
        <div className="absolute left-[6.15%] right-[2.14%] top-[32.06%]">
          <div className="flex flex-row items-center justify-center text-lg bg-gray-900">
            {targets.map((item, index) => (
            <DroppableColumn key={index} col={item} index={index} type={'transactions-col'} >
              <div
                  className="box-border p-6 m-4 h-[20vh] w-[10vw] border border-yellow-400 rounded-md overflow-auto"
                  style={{transform: "none"}}
              >
              <Item id={index} item={item.column}/>
              {item.values.length > 0 ?
                  item.values.map((transaction, i) =>
                      (
                          <Item key={i} id={transaction.id} item={transaction.value}/>
                      ))
                  : <FontAwesomeIcon className="mt-[4vh] opacity-30 text-white transition duration-300 ease-in-out hover:opacity-60" icon={faPlus} size="3x"/>}
                </div>
            </DroppableColumn>
                ))}
          </div>
          <div>
            <div
                className="bg-gray-900 flex flex-row justify-center items-center grid-cols-6 gap-[2vw]"
            >
              {columns.map((item, index) => (
                  <DraggableColumn col={item} index={index} key={item} transactions={transactions}/>
              ))}
            </div>
          </div>
        </div>
      </DndContext>
        </DndProvider>
    </main>
  );
}