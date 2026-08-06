import React from 'react';
import { Users, UserPlus, Activity, HeartPulse } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function Dashboard() {
  const stats = [
    { label: 'Total Assessments', value: '1,284', icon: Users, color: 'text-sage-600', bg: 'bg-sage-50' },
    { label: 'Daily Patients', value: '42', icon: UserPlus, color: 'text-clay-500', bg: 'bg-clay-50' },
    { label: 'Indigent Patients', value: '856', icon: HeartPulse, color: 'text-sage-700', bg: 'bg-sage-100' },
    { label: 'Active Social Workers', value: '12', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const barData = [
    { name: 'Jan', OPD: 120, ER: 80, IP: 50 },
    { name: 'Feb', OPD: 132, ER: 90, IP: 55 },
    { name: 'Mar', OPD: 101, ER: 110, IP: 40 },
    { name: 'Apr', OPD: 140, ER: 100, IP: 60 },
    { name: 'May', OPD: 150, ER: 120, IP: 70 },
    { name: 'Jun', OPD: 110, ER: 85, IP: 45 },
  ];

  const pieData = [
    { name: 'Indigent', value: 400 },
    { name: 'C1', value: 300 },
    { name: 'C2', value: 200 },
    { name: 'Financially Capacitated', value: 100 },
  ];

  const COLORS = ['#d97d54', '#823e25', '#5c8366', '#a1bca8'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-sage-100 p-5 flex items-center shadow-sm">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="bg-white rounded-2xl border border-sage-100 p-5 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-[#2D4F3E] mb-4">Monthly Patient Traffic (OPD / ER / IP)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="OPD" stackId="a" fill="#d97d54" radius={[0, 0, 4, 4]} />
                <Bar dataKey="ER" stackId="a" fill="#eacfb7" />
                <Bar dataKey="IP" stackId="a" fill="#5c8366" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl border border-sage-100 p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2D4F3E] mb-4">Patient Classification</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center text-xs text-slate-600">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
