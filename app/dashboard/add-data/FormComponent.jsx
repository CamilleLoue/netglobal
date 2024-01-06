import React from 'react';

const FormComponent = ({ setBankName, setAccountType, setCurrency, setBalance }) => {

    return (
        <div className="container mx-auto p-4">
            <form className="flex flex-row justify-between items-center">
                <div className="flex flex-col mr-4">
                    <label htmlFor="bankName" className="mb-1">Bank Name:</label>
                    <input
                        type="text"
                        id="bankName"
                        placeholder="Your Bank Name"
                        className="p-2 border rounded"
                        onChange={(e) => setBankName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col mr-4">
                    <label htmlFor="accountType" className="mb-1">Account Type:</label>
                    <select
                        id="accountType"
                        className="p-2 border rounded"
                        onChange={(e) => setAccountType(e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>Select account type</option>
                        <option value="Checking">Checking</option>
                        <option value="Savings">Savings</option>
                        <option value="Credit">Credit</option>
                        <option value="Investment">Investment</option>
                        <option value="Retirement">Retirement</option>
                        {/* Add more account types as needed */}
                    </select>
                </div>

                <div className="flex flex-col mr-4">
                    <label htmlFor="currency" className="mb-1">Currency:</label>
                    <select
                        id="currency"
                        className="p-2 border rounded"
                        onChange={(e) => setCurrency(e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>Select your currency</option>
                        <option value="USD">USD - United States Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="AED">AED - Emirati Dirham</option>
                        <option value="JPY">JPY - Japanese Yen</option>
                        <option value="GBP">GBP - Pound Sterling</option>
                        <option value="AUD">AUD - Australian Dollar</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                        <option value="CHF">CHF - Swiss Franc</option>
                        <option value="CNY">CNY - Chinese Yuan</option>
                        <option value="HKD">HKD - Hong Kong Dollar</option>
                        <option value="NZD">NZD - New Zealand Dollar</option>
                        <option value="SEK">SEK - Swedish Krona</option>
                        <option value="KRW">KRW - South Korean Won</option>
                        <option value="SGD">SGD - Singapore Dollar</option>
                        <option value="NOK">NOK - Norwegian Krone</option>
                        <option value="MXN">MXN - Mexican Peso</option>
                    </select>
                </div>


            </form>
        </div>
    );
};

export default FormComponent;
