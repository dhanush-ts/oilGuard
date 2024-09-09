import { VesselMap } from '@/components/dashboard/AllShips';
import { VesselFinderRoute } from '@/components/dashboard/Search';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

export const DashSidebar = () => {
  const [activeTab, setActiveTab] = useState('All Ships');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const [curDash, setCurDash] = useState(<VesselMap />);

  useEffect(() => {
    switch (activeTab) {
      case 'All Ships':
        setCurDash(<VesselMap />);
        break;
      case 'Search':
        setCurDash(<VesselFinderRoute />);
        break;
      default:
        setCurDash(<VesselMap />);
    }
  }, [activeTab]);

  return (
    <div className="md:flex m-10">
      <ul className="flex flex-col space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:mr-4 mb-4 md:mb-0">        
        <li>
          <Button
            onClick={() => handleTabChange('All Ships')}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'All Ships'
                ? 'hover:bg-red-600 bg-red-500 text-white' // Active tab in red
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
            }`}
          >
            All Ships
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleTabChange('Search')}
            className={`w-full px-4 py-3 text-left rounded-lg transition-colors duration-300 ${
              activeTab === 'Search'
                ? 'hover:bg-red-600 bg-red-500 text-white' // Active tab in red
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100'
            }`}
          >
            Search
          </Button>
        </li>
        
      </ul>
      <div className="p-6 bg-gray-100 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full  transition-colors duration-300">
        {curDash}
      </div>
    </div>
  );
};
