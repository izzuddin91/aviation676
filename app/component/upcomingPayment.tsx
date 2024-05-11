import React from 'react';

const UpcomingPayment = () => {
    return (
        <div className="grid grid-cols-1 gap-4 p-4 pb-10;">
                  <div className="grid grid-cols-1 gap-4 p-4 pb-10;">
        <div>
          <h2> upcoming payment ascending order </h2>
        </div>
      </div>
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Details
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Category
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Date
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Total
              </th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
          <tr>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Pangsapuri Suakasih electric</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  <a>Vehicle</a>
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                12 th
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* {row["total"]} */}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* <button onClick={() => deleteItem(row['id'])}>
                        {row['id']}
                      </button> */}
              </td>
            </tr>
            <tr>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Trion water bill</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  <a>Vehicle</a>
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 th
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* {row["total"]} */}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* <button onClick={() => deleteItem(row['id'])}>
                        {row['id']}
                      </button> */}
              </td>
            </tr>
            <tr>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">Netizen electric</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  <a>Vehicle</a>
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                14 th
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* {row["total"]} */}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* <button onClick={() => deleteItem(row['id'])}>
                        {row['id']}
                      </button> */}
              </td>
            </tr>
            <tr>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">rumah kelantan</td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  <a>Vehicle</a>
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                16 th
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* {row["total"]} */}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {/* <button onClick={() => deleteItem(row['id'])}>
                        {row['id']}
                      </button> */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default UpcomingPayment