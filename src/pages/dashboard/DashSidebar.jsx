import { CustomerSupport } from '@/components/dashboard/CustomerSupport';
import { FinancialDash } from '@/components/dashboard/FinancialDash';
import { VesselMap } from '@/components/dashboard/MarketingDash';
import { VesselFinderRoute } from '@/components/dashboard/ProjectManagementDash';
import { SalesDash } from '@/components/dashboard/SalesDash';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

export const DashSidebar = () => {
  const [activeTab, setActiveTab] = useState('Finance');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [curDash, setCurDash] = useState(<FinancialDash />);

  useEffect(() => {
    switch (activeTab) {
      case 'Finance':
        setCurDash(<FinancialDash />);
        break;
      case 'Market':
        setCurDash(<VesselMap />);
        break;
      case 'Customer':
        setCurDash(<CustomerSupport />);
        break;
      case 'Sales':
        setCurDash(<SalesDash />);
        break; 
      case 'Project':
        setCurDash(<VesselFinderRoute />);
        break;
      default:
        setCurDash(<FinancialDash />);
    }
  }, [activeTab]);

  return (
    <div className="md:flex m-10">
      <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:mr-4 mb-4 md:mb-0">
        <li>
          <Button
            onClick={() => handleTabChange('Finance')}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Finance'
                ? 'hover:bg-red-600 bg-red-500 text-white' // Active tab in red
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
            }`}
          >
            Finance
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Market')}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Market'
                ? 'hover:bg-red-600 bg-red-500 text-white' // Active tab in red
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
            }`}
          >
            Market
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Sales')}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Sales'
                ? 'hover:bg-red-600 bg-red-500 text-white' // Active tab in red
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
            }`}
          >
            Sales
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Project')}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Project'
                ? 'hover:bg-red-600 bg-red-500 text-white' // Active tab in red
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
            }`}
          >
            Project Management
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Customer')}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Customer'
                ? 'hover:bg-red-600 bg-red-500 text-white' // Active tab in red
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
            }`}
          >
            Customer Support
          </Button>
        </li>
      </ul>
      <div className="p-6 bg-gray-100 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full transition-colors duration-300">
        {curDash}
      </div>
    </div>
  );
};
