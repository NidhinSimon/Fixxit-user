import React from 'react';

function Invoice() {
  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      {/* Invoice header */}
      <div className="text-center mb-4">
        <img
          src="your-logo.png"
          alt="Your Company Logo"
          className="w-20 mx-auto mb-2"
        />
        <h1 className="text-2xl font-semibold">Invoice</h1>
      </div>

      {/* Invoice details */}
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <h2 className="font-semibold">Billed To:</h2>
          <p>Customer Name</p>
          <p>Customer Address</p>
          <p>City, ZIP</p>
        </div>
        <div className="w-1/2 text-right">
          <h2 className="font-semibold">Invoice Details:</h2>
          <p>Invoice Number: INV-001</p>
          <p>Invoice Date: June 1, 2023</p>
          <p>Due Date: June 15, 2023</p>
        </div>
      </div>

      {/* Invoice table */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 bg-gray-100">Service Description</th>
            <th className="p-2 bg-gray-100">Unit Price</th>
            <th className="p-2 bg-gray-100">Quantity</th>
            <th className="p-2 bg-gray-100">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2">Service 1</td>
            <td className="p-2">$100.00</td>
            <td className="p-2">2</td>
            <td className="p-2">$200.00</td>
          </tr>
          <tr>
            <td className="p-2">Service 2</td>
            <td className="p-2">$75.00</td>
            <td className="p-2">1</td>
            <td className="p-2">$75.00</td>
          </tr>
        </tbody>
      </table>

      {/* Invoice total */}
      <div className="text-right mt-4">
        <p className="text-lg font-semibold">Total Amount: $275.00</p>
      </div>
    </div>
  );
}

export default Invoice;
