import React from 'react';
import { HeartHandshake, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';

export function Assistance() {
  const mockAssistance = [
    { id: 'AST-001', patient: 'Juan Dela Cruz', type: 'Financial Assistance', amount: 'Php 5,000', status: 'Released', date: '2023-10-15' },
    { id: 'AST-002', patient: 'Maria Clara', type: 'Medicine', amount: 'Php 1,200', status: 'Pending', date: '2023-10-16' },
    { id: 'AST-003', patient: 'Pedro Penduko', type: 'Laboratory', amount: 'Php 800', status: 'Approved', date: '2023-10-18' },
    { id: 'AST-004', patient: 'Crisostomo Ibarra', type: 'Transportation', amount: 'Php 500', status: 'Cancelled', date: '2023-10-20' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Released': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sage-100 text-sage-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Released</span>;
      case 'Pending': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
      case 'Approved': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-clay-100 text-clay-800"><CheckCircle2 className="w-3 h-3 mr-1" /> Approved</span>;
      case 'Cancelled': return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800"><XCircle className="w-3 h-3 mr-1" /> Cancelled</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white rounded-2xl border border-sage-100 p-5 flex items-center shadow-sm">
            <div className="bg-sage-100 text-sage-700 p-3 rounded-xl mr-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Assistance Provided</p>
              <h3 className="text-2xl font-bold text-[#2D4F3E]">Php 145,200</h3>
            </div>
          </div>
      </div>

      <div className="bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-sage-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#2D4F3E]">Recent Assistance Records</h2>
          <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-clay-500 hover:bg-clay-600">
            <Plus className="mr-2 h-4 w-4" /> New Record
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-sage-200">
            <thead className="bg-sage-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Record ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assistance Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount / Value</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sage-200">
              {mockAssistance.map((item) => (
                <tr key={item.id} className="hover:bg-sage-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {getStatusBadge(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
