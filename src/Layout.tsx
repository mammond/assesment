import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  History, 
  HeartHandshake, 
  BarChart3, 
  Settings,
  Bell
} from 'lucide-react';
import { TabType } from './types';

interface LayoutProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  children: React.ReactNode;
}

export function Layout({ activeTab, setActiveTab, children }: LayoutProps) {
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Assessment', label: 'Patient Assessment', icon: FileText },
    { id: 'CaseHistory', label: 'Case History', icon: History },
    { id: 'Assistance', label: 'Assistance Module', icon: HeartHandshake },
    { id: 'Reports', label: 'Reports', icon: BarChart3 },
    { id: 'Administration', label: 'Administration', icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen bg-[#F8F9F5] overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-sage-800 text-white flex flex-col hidden md:flex">
        <div className="flex items-center gap-3 p-6 mb-4">
          <div className="w-10 h-10 bg-clay-500 rounded-xl flex items-center justify-center font-bold text-xl">M</div>
          <div>
            <h1 className="text-lg font-bold leading-tight">MSWD</h1>
            <p className="text-[10px] uppercase tracking-wider opacity-60">Medical Social Tool</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-sage-700 text-white' 
                        : 'text-white/70 hover:bg-sage-700/50 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-white/70'}`} />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-6 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sage-500 border border-white/20 flex items-center justify-center font-bold text-xs">
              EV
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Elena Vance, MSW</p>
              <p className="text-[10px] opacity-60 text-white">Supervisor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-sage-100 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-sage-800">
            {navItems.find(i => i.id === activeTab)?.label}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-500">
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-clay-500"></span>
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
