import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Truck, 
  Activity, 
  TrendingUp, 
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Map', path: '/live-map', icon: Map },
    { name: 'Vehicles', path: '/vehicles', icon: Truck },
    { name: 'Telemetry', path: '/telemetry', icon: Activity },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        ${styles.sidebar}
        ${isCollapsed ? styles.collapsed : styles.expanded}
        ${isOpen ? styles.mobileOpen : ''}
      `}>
        {/* Navigation Section */}
        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.activeLink : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.icon}>
                  <Icon size={20} />
                </span>
                <span className={styles.label}>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className={styles.footer}>
          {/* Active System Gateway Node info */}
          <div className={styles.nodeBadge} title="Cluster Host Node: AWS-USE1-G1">
            <span className={`${styles.nodeLight} anim-pulse-success`} />
            <div className={styles.nodeInfo}>
              <span className={styles.nodeTitle}>Gateway Node</span>
              <span className={styles.nodeStatus}>AWS-USE1-G1 [OK]</span>
            </div>
          </div>

          {/* Collapse/Expand Toggle Button */}
          <button 
            className={styles.toggleButton} 
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar Menu" : "Collapse Sidebar Menu"}
            aria-label={isCollapsed ? "Expand Sidebar Menu" : "Collapse Sidebar Menu"}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            <span className={styles.toggleText}>Collapse HUD</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
