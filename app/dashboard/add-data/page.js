"use client";
import { useState } from "react";
import Papa from "papaparse";
import apiClient from "@/libs/api";

export default function AddData() {
  const [csvFile, setCsvFile] = useState(null);

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleAddData = async () => {
    if (!csvFile) {
      console.error("No CSV file uploaded.");
      return;
    }

    try {
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
    }
  };

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
    </main>
  );
}