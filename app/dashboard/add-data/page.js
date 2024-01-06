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
import FormComponent from "@/app/dashboard/add-data/FormComponent";


const defaultTransactions = [{id: 0, 'values': {'0': '24/02/2023', '1': 'Store', '2': 25.26, '3': 29000}},
  {id: 1, 'values': {'0': '24/03/2023', '1': 'Store 2', '2': 23.26, '3': 30000}}]

const targetValues = [
    {'column': 'Transaction Date', 'values': []},
  {'column': 'Description', 'values': []},
  {'column': 'Amount', 'values': []},
  {'column': 'Balance', 'values': []}]


export default function AddData() {
  const [csvFile, setCsvFile] = useState(null);
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [columns, setColumns] = useState(['0', '1', '2']);
  const [targets, setTargets] = useState(targetValues);
  const [bankName, setBankName] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [currency, setCurrency] = useState(null);


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
  };

  const handleSubmitData = async () => {

    const transactions = targets[0].values.map((_, index) => {
      const transaction = {};
      targets.forEach(column => {
        // Assuming that the order of 'values' in each column corresponds to the same transaction
        const valueObject = column.values[index];
        // Create a key-value pair in the transaction object
        transaction[column.column] = valueObject.value;
      });
      return transaction;
    });
    transactions.forEach(transaction => {
      transaction["Bank Name"] = bankName;
      transaction["Account Type"] = accountType;
      transaction["Currency"] = currency;
    });
    await apiClient.post("/transactions", transactions
    );
  }

  const handleDrop = (droppedItem, destination) => {
    if (!destination || destination.index < 0 || destination.index > columns.length + 1) return;
    console.log(droppedItem)
    console.log(destination)
    const vals = transactions.map(transaction => {
      return {id: transaction.id, value: transaction.values[droppedItem.col]}
    })
    console.log(vals)
    const newTargets = [...targets]
    const targetItem = targetValues.find(item => item.column === destination.column);
    if (targetItem) {
      // Modify the 'values' array as needed. For example, adding a date string:
      targetItem['values'] = vals
    }
    console.log("newTargets", newTargets)
    setTargets(newTargets)
    const updatedList = [...columns];
    updatedList.splice(droppedItem.index, 1);
    setColumns(updatedList);

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
            Load file
          </button>
        </form>
        <button
            type="button"
            onClick={handleSubmitData}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        <FormComponent setBankName={setBankName} setAccountType={setAccountType} setCurrency={setCurrency} />
      </section>
      <section className="space-y-8">
      <DndProvider backend={HTML5Backend}>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDrop}>
        <div className="w-full h-72">
          <div className="w-full flex flex-row items-center justify-center text-lg bg-gray-900">
            {targets.map((item, index) => (
            <DroppableColumn key={index} col={item} index={index} type={'transactions-col'} handleDrop={handleDrop}>
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
      </section>
    </main>
  );
}