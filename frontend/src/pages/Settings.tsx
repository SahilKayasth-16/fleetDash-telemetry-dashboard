import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import IconWrapper from '../components/ui/IconWrapper';

export const Settings: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'slideUp 0.4s forwards' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.05em', color: '#ffffff', textTransform: 'uppercase' }}>
          Settings
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Configure fleet alert thresholds, API gateways, and user preferences.
        </p>
      </div>

      <Card glow="blue" corners style={{ padding: '48px 24px', textAlign: 'center' }}>
        <IconWrapper theme="blue" size="lg" style={{ margin: '0 auto 20px auto' }}>
          <SettingsIcon size={24} />
        </IconWrapper>
        <h3 style={{ fontFamily: 'var(--font-primary)', fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          System Control Settings
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '12px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
          This section will be implemented during future development milestones.
        </p>
      </Card>
    </div>
  );
};

export default Settings;
