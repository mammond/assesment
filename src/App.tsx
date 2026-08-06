/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './Layout';
import { Dashboard } from './Dashboard';
import { Assessment } from './Assessment';
import { CaseHistory } from './CaseHistory';
import { Assistance } from './Assistance';
import { TabType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('Dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Assessment':
        return <Assessment />;
      case 'CaseHistory':
        return <CaseHistory />;
      case 'Assistance':
        return <Assistance />;
      case 'Reports':
        return <div className="p-8 text-center text-slate-500 animate-in fade-in">Reports Module (Placeholder)</div>;
      case 'Administration':
        return <div className="p-8 text-center text-slate-500 animate-in fade-in">Administration Module (Placeholder)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

