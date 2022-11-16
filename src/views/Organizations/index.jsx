import React from 'react';
import Header from '@Components/common/Header';
import Button from '@Components/common/Button';

const tableData = [
  {
    id: 1,
    name: 'World Bicycle Relief',
    admin: 'admin@worldbicyclerelief.org',
    projects: 12,
  },
  { id: 2, name: 'EPFL', admin: 'admin@epfl.org', projects: 1 },
  {
    id: 3,
    name: 'Nepal Flying Lab',
    admin: 'admin@flyinglabs.org',
    projects: 4,
  },
  { id: 4, name: 'Naxa Pvt Ltd', admin: 'admin@naxa.org', projects: 8 },
];

export default function Organizations() {
  return (
    <div>
      <Header />

      <div className="naxatw-mt-28 naxatw-px-16 naxatw-py-10">
        <div className="naxatw-flex naxatw-items-center naxatw-justify-between">
          <h3 className="naxatw-font-bold naxatw-text-4xl naxatw-tracking-wide">
            Organizations
          </h3>
          <Button className="naxatw-px-5 naxatw-py-3 naxatw-bg-primary-400 naxatw-rounded-lg naxatw-text-white naxatw-font-bold">
            Create New
          </Button>
        </div>

        <div className="naxatw-flex naxatw-items-center naxatw-w-96 naxatw-mt-8">
          <label htmlFor="simple-search" className="naxatw-sr-only">
            Search
          </label>
          <div className="naxatw-relative naxatw-w-full">
            <div className="naxatw-absolute naxatw-inset-y-0 naxatw-left-0 naxatw-flex naxatw-items-center naxatw-pl-3 naxatw-pointer-events-none">
              <svg
                aria-hidden="true"
                className="naxatw-w-5 naxatw-h-5 naxatw-text-grey-500 naxatw-dark:text-grey-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="naxatw-h-16 naxatw-bg-grey-100 naxatw-border naxatw-border-grey-300 naxatw-text-grey-900 naxatw-text-lg naxatw-rounded-full naxatw-focus:ring-blue-500 naxatw-focus:border-blue-500 naxatw-block naxatw-w-full naxatw-pl-10 naxatw-p-2.5  naxatw-dark:bg-grey-700 naxatw-dark:border-grey-600 naxatw-dark:placeholder-grey-400 naxatw-dark:text-white naxatw-dark:focus:ring-blue-500 naxatw-dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <div className="naxatw-overflow-x-auto naxatw-relative naxatw-mt-8">
          <table className="naxatw-w-full naxatw-text-lg naxatw-text-left naxatw-text-grey-500 naxatw-dark:text-grey-400">
            <thead className="naxatw-text-lg naxatw-text-grey-700 naxatw-uppercase naxatw-bg-grey-50 naxatw-dark:bg-grey-700 naxatw-dark:text-grey-400">
              <tr>
                <th scope="col" className="naxatw-py-3 naxatw-px-6">
                  SN
                </th>
                <th scope="col" className="naxatw-py-3 naxatw-px-6">
                  Name
                </th>
                <th scope="col" className="naxatw-py-3 naxatw-px-6">
                  Admin
                </th>
                <th scope="col" className="naxatw-py-3 naxatw-px-6">
                  Projects
                </th>
                <th scope="col" className="naxatw-py-3 naxatw-px-6" />
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ id, name, admin, projects }, idx) => (
                <tr
                  key={id}
                  className="naxatw-bg-white naxatw-border-b naxatw-dark:bg-grey-800 naxatw-dark:border-grey-700"
                >
                  <th
                    scope="row"
                    className="naxatw-py-4 naxatw-px-6 naxatw-font-medium  naxatw-whitespace-nowrap naxatw-dark:text-white"
                  >
                    {idx + 1}
                  </th>
                  <th
                    scope="row"
                    className="naxatw-py-4 naxatw-px-6 naxatw-font-medium naxatw-text-grey-900 naxatw-whitespace-nowrap naxatw-dark:text-white"
                  >
                    {name}
                  </th>
                  <td className="naxatw-py-4 naxatw-px-6">{admin}</td>
                  <td className="naxatw-py-4 naxatw-px-6">{projects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
