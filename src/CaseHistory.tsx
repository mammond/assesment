import React, { useState } from 'react';
import { Search, Filter, Eye, FileText, Download } from 'lucide-react';

export function CaseHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockCases = [
    { id: 'HN-2023-001', name: 'Juan Dela Cruz', date: '2023-10-15', diagnosis: 'CKD Stage V', worker: 'Ana Santos', status: 'Approved' },
    { id: 'HN-2023-002', name: 'Maria Clara', date: '2023-10-16', diagnosis: 'Pneumonia', worker: 'Jose Rizal', status: 'Pending' },
    { id: 'HN-2023-003', name: 'Pedro Penduko', date: '2023-10-18', diagnosis: 'Appendicitis', worker: 'Ana Santos', status: 'Released' },
    { id: 'HN-2023-004', name: 'Crisostomo Ibarra', date: '2023-10-20', diagnosis: 'Dengue Fever', worker: 'Maria Leonora', status: 'Approved' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-sage-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-sage-200 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-clay-500 focus:border-clay-500 sm:text-sm"
            placeholder="Search by Hospital No, Name, or Diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </button>
          <button className="flex-1 sm:flex-none inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-clay-500 hover:bg-clay-600">
            <Download className="mr-2 h-4 w-4" /> Export
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-sage-200">
          <thead className="bg-sage-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hospital No.</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Diagnosis</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Social Worker</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sage-200">
            {mockCases.map((caseItem) => (
              <tr key={caseItem.id} className="hover:bg-sage-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-600">{caseItem.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{caseItem.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{caseItem.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{caseItem.diagnosis}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{caseItem.worker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-clay-500 hover:text-clay-700" title="View Assessment"><Eye className="h-5 w-5" /></button>
                    <button className="text-sage-600 hover:text-sage-800" title="View Narrative"><FileText className="h-5 w-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
