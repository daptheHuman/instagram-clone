import React, { useEffect } from 'react';
import Header from '../components/Header';

const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard - Instagram';
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    </div>
  );
};

export default Dashboard;
