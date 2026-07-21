import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../components/ui/Button';
import styles from './NotFound.module.css';

export const NotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <Compass size={40} className="anim-pulse-success" style={{ animationDuration: '3s', color: 'var(--color-neon-cyan)' }} />
      </div>
      
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.errorTitle}>Off Course: Page Not Found</p>
      <p className={styles.errorDesc}>
        The coordinates you requested are outside current mapping limits. Double check the address or return to base.
      </p>
      
      <div className={styles.actions}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="md">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
