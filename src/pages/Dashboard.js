import React, { useEffect } from 'react';
import Header from '../components/Header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Instagram';
  }, []);
  return (
    <div className="bg-lightgray">
      <Header className="z-10" />
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 px-10 xl:px-60 z-0">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
