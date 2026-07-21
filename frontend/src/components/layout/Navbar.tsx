import React from 'react';
import { Menu, Bell, Radio, User } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <button
          onClick={onMenuClick}
          className={styles.menuButton}
          aria-label="Open Navigation Drawer"
        >
          <Menu size={20} />
        </button>
        
        <div className={styles.logoContainer}>
          <div className={styles.logoBox}>
            <Radio size={20} className="anim-pulse-success" style={{ animationDuration: '4s' }} />
          </div>
          <div className={styles.brandText}>
            <span className={styles.title}>FleetDash</span>
            <span className={styles.subtitle}>Telemetry Operations Center</span>
          </div>
        </div>

        <div className={styles.envBadge}>
          Dev Environment
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Mock Notification Bell */}
        <button className={styles.iconButton} aria-label="Notifications" title="System Notifications (4 active alerts)">
          <Bell size={18} />
          <span className={styles.badgeDot} />
        </button>

        {/* User Profile Panel */}
        <div className={styles.userPanel}>
          <div className={styles.avatar} title="User Profile: Operator Alpha">
            <User size={16} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Operator Alpha</span>
            <span className={styles.userRole}>Super Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
