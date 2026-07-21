import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Navbar } from '../components/layout/Navbar';
import styles from './DashboardLayout.module.css';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.layoutContainer}>
      {/* High-tech overlay grid */}
      <div className="hud-grid-overlay" />

      {/* Top Header Navigation */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      {/* Main Viewport Split Area */}
      <div className={styles.mainViewport}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Dynamic page contents scroll area */}
        <main className={styles.pageContentScroll}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
