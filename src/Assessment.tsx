import React, { useState, useEffect } from 'react';
import { Save, Printer, Copy, Download, RefreshCw, Wand2, Plus, Trash2, Activity, FileText } from 'lucide-react';
import { PatientData, FamilyMember } from './types';

export function Assessment() {
  const [formData, setFormData] = useState<PatientData>({
    date: new Date().toISOString().split('T')[0],
    hospitalNumber: '',
    patientName: '',
    age: 0,
    sex: 'Male',
    civilStatus: 'Single',
    address: '',
    contactNumber: '',
    philhealthNumber: '',
    membershipType: 'None',
    referralSource: '',
    assignedSocialWorker: '',
    patientType: 'OPD',
    ageGroup: 'Adult',
    
    chiefComplaint: '',
    currentMedicalCondition: '',
    finalDiagnosis: '',
    attendingPhysician: '',
    wardUnit: '',
    dateAdmitted: '',
    purpose: [],
    
    householdSize: 1,
    monthlyIncome: 0,
    monthlyBasicNeeds: 0,
    medicalExpenses: 0,
    sourceOfIncome: '',
    occupation: '',
    employmentStatus: 'Unemployed',
    manualOverride: false,
    catastrophicIllness: false,
    
    familyComposition: [],
    livingCondition: 'Own House',
    utilities: [],
    transportation: '',
    education: '',
    supportSystem: '',
    religion: ''
  });

  const [clsRatio, setClsRatio] = useState<number>(0);
  const [classification, setClassification] = useState<string>('');
  const [riskLevel, setRiskLevel] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [narrative, setNarrative] = useState('');

  // Auto-compute Household Size and Age Group
  useEffect(() => {
    const newHouseholdSize = formData.familyComposition.length + 1;
    let newAgeGroup: 'Adult' | 'Pediatric' | 'Geriatric' = 'Adult';
    if (formData.age <= 17) newAgeGroup = 'Pediatric';
    else if (formData.age >= 60) newAgeGroup = 'Geriatric';

    if (newHouseholdSize !== formData.householdSize || newAgeGroup !== formData.ageGroup) {
      setFormData(prev => ({ ...prev, householdSize: newHouseholdSize, ageGroup: newAgeGroup }));
    }
  }, [formData.familyComposition.length, formData.age, formData.householdSize, formData.ageGroup]);

  // Auto-compute CLS Ratio, Classification and Recommendation
  useEffect(() => {
    const inc = Number(formData.monthlyIncome) || 0;
    const size = Number(formData.householdSize) || 1;
    const med = Number(formData.medicalExpenses) || 0;
    const basic = Number(formData.monthlyBasicNeeds) || 0;
    
    const perCapita = inc / size;
    const netIncome = inc - basic;
    const ratio = (netIncome > 0) ? (med / netIncome) : (med > 0 ? 1.0 : 0);
    
    setClsRatio(Number(ratio.toFixed(2)));

    let currentClass = 'Indigent';
    if(perCapita >= 5186.86) currentClass = 'Financially Capacitated';
    else if(perCapita >= 4243.80) currentClass = 'C1';
    else if(perCapita >= 3300.74) currentClass = 'C2';
    
    let isCatastrophic = ratio >= 0.40 || formData.manualOverride || formData.catastrophicIllness;
    let currentRisk = (isCatastrophic || currentClass === 'Indigent') ? 'High Risk' : 'Moderate Risk';

    setClassification(currentClass);
    setRiskLevel(currentRisk);

    let matrix = '';
    const diag = formData.finalDiagnosis.toLowerCase();
    const isSpecial = diag.includes("biopsy") || diag.includes("apheresis") || diag.includes("histopath");
    const isBiteCase = diag.includes("cat bite") || diag.includes("dog bite") || diag.includes("rabies");
    const isPE = formData.purpose.includes("Physical Examination");

    if (isBiteCase) {
        matrix = "POS ENROLLMENT";
    } else if (isSpecial) {
        matrix = "Procedure: FULL PAY | Reading Fee: FULL PAY (Special Test Policy)";
    } else if (isPE) {
        if (currentClass === "Financially Capacitated") matrix = "Procedure: FULL PAY | Reading Fee: FULL PAY";
        else if (currentClass === "C1") matrix = "Procedure: 75% DISCOUNT | Reading Fee: FULL PAY";
        else if (currentClass === "C2") matrix = "Procedure: 50% DISCOUNT | Reading Fee: FULL PAY";
        else matrix = "Procedure: 100% DISCOUNT | Reading Fee: FULL PAY";
    } else {
        if (currentClass === "Financially Capacitated") {
            matrix = isCatastrophic ? "Procedure: MAIFIPP | Reading Fee: MAIFIPP" : "FULL PAY";
        } else {
            if (formData.referralSource === "R2TMC" || formData.referralSource === "Outside Govt" || isCatastrophic) {
                matrix = "Procedure: MAIFIPP | Reading Fee: MAIFIPP";
            } else {
                let d = currentClass === "C1" ? "75%" : (currentClass === "C2" ? "50%" : "100%");
                matrix = `Procedure: ${d} DISCOUNT | Reading Fee: FULL PAY`;
            }
        }
    }

    setRecommendation(matrix);
  }, [formData.monthlyIncome, formData.householdSize, formData.medicalExpenses, formData.monthlyBasicNeeds, formData.finalDiagnosis, formData.purpose, formData.referralSource, formData.manualOverride, formData.catastrophicIllness]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      
      // Handle array checkboxes (like utilities or purpose)
      if (name === 'utilities' || name === 'purpose') {
        const currentList = [...(formData[name as keyof PatientData] as string[])];
        if (checked) {
          currentList.push(value);
        } else {
          const index = currentList.indexOf(value);
          if (index > -1) currentList.splice(index, 1);
        }
        setFormData({ ...formData, [name]: currentList });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      familyComposition: [
        ...formData.familyComposition,
        { id: Math.random().toString(), name: '', age: 0, relationship: '', occupation: '', monthlyIncome: 0 }
      ]
    });
  };

  const updateFamilyMember = (index: number, field: string, value: string | number) => {
    const updated = [...formData.familyComposition];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, familyComposition: updated });
  };

  const removeFamilyMember = (index: number) => {
    const updated = [...formData.familyComposition];
    updated.splice(index, 1);
    setFormData({ ...formData, familyComposition: updated });
  };

  const generateNarrative = async () => {
    setIsGenerating(true);
    try {
      const payload = {
        ...formData,
        clsRatio,
        classification,
        recommendation
      };

      const res = await fetch('/api/generate-narrative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.narrative) {
        setNarrative(data.narrative);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate narrative');
    } finally {
      setIsGenerating(false);
    }
  };

  const printDocument = () => {
    window.print();
  };

  const inputClass = "mt-1 block w-full rounded-md border-sage-200 shadow-sm focus:border-clay-500 focus:ring-clay-500 sm:text-sm py-2 px-3 border";
  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12 print:m-0 print:p-0">
      
      {/* Form Header */}
      <div className="bg-white p-6 rounded-2xl border border-sage-100 shadow-sm flex justify-between items-center print:hidden">
        <div>
          <h2 className="text-xl font-bold text-slate-800">New Patient Assessment</h2>
          <p className="text-sm text-slate-500">Fill out the form below to generate a comprehensive assessment.</p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </button>
          <button onClick={printDocument} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-clay-500 hover:bg-clay-600">
            <Printer className="mr-2 h-4 w-4" /> Print Form
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Patient Information */}
          <div className="bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden">
            <div className="bg-sage-50 px-6 py-4 border-b border-sage-100">
              <h3 className="text-lg font-semibold text-[#2D4F3E]">I. Patient Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Hospital Number</label>
                <input type="text" name="hospitalNumber" value={formData.hospitalNumber} onChange={handleChange} className={inputClass} placeholder="e.g. HN-2023-001" />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Patient Name</label>
                <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Sex</label>
                <select name="sex" value={formData.sex} onChange={handleChange} className={inputClass}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Civil Status</label>
                <select name="civilStatus" value={formData.civilStatus} onChange={handleChange} className={inputClass}>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Widowed</option>
                  <option>Separated</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Contact Number</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>PhilHealth Number</label>
                <input type="text" name="philhealthNumber" value={formData.philhealthNumber} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Membership Type</label>
                <select name="membershipType" value={formData.membershipType} onChange={handleChange} className={inputClass}>
                  <option>None</option>
                  <option>Direct Contributor</option>
                  <option>Indirect Contributor</option>
                  <option>Indigent</option>
                  <option>Senior Citizen</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Referral Source</label>
                <select name="referralSource" value={formData.referralSource} onChange={handleChange} className={inputClass}>
                  <option value="">Select Source</option>
                  <option value="R2TMC">R2TMC Patient</option>
                  <option value="Outside Govt">Outside Govt</option>
                  <option value="Outside Private">Outside Private</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Patient Type</label>
                <select name="patientType" value={formData.patientType} onChange={handleChange} className={inputClass}>
                  <option>OPD</option>
                  <option>ER</option>
                  <option>IP</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Age Group (Auto)</label>
                <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} className={`${inputClass} bg-slate-50`} disabled>
                  <option value="Adult">Adult</option>
                  <option value="Pediatric">Pediatric</option>
                  <option value="Geriatric">Geriatric</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Medical Information */}
          <div className="bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden">
             <div className="bg-sage-50 px-6 py-4 border-b border-sage-100">
              <h3 className="text-lg font-semibold text-[#2D4F3E]">II. Medical Information</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>Chief Complaint</label>
                <textarea name="chiefComplaint" value={formData.chiefComplaint} onChange={handleChange} rows={2} className={inputClass}></textarea>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Final Diagnosis</label>
                <textarea name="finalDiagnosis" value={formData.finalDiagnosis} onChange={handleChange} rows={2} className={inputClass}></textarea>
              </div>
              <div>
                <label className={labelClass}>Attending Physician</label>
                <input type="text" name="attendingPhysician" value={formData.attendingPhysician} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Ward / Unit</label>
                <input type="text" name="wardUnit" value={formData.wardUnit} onChange={handleChange} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Purpose of Assessment</label>
                <div className="mt-2 space-y-2">
                  {['Medical', 'Physical Examination', 'Financial Assistance', 'Other'].map(p => (
                    <div key={p} className="flex items-center">
                      <input type="checkbox" name="purpose" value={p} onChange={handleChange} className="h-4 w-4 text-clay-500 focus:ring-clay-500 border-gray-300 rounded" />
                      <label className="ml-2 text-sm text-slate-700">{p}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Socio-Economic */}
          <div className="bg-white rounded-2xl border border-sage-100 shadow-sm overflow-hidden">
            <div className="bg-sage-50 px-6 py-4 border-b border-sage-100">
              <h3 className="text-lg font-semibold text-[#2D4F3E]">III. Socio-Economic Assessment</h3>
            </div>
            <div className="p-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className={labelClass}>Household Size (Auto)</label>
                  <input type="number" name="householdSize" value={formData.householdSize} onChange={handleChange} className={`${inputClass} bg-slate-50`} readOnly />
                </div>
                <div>
                  <label className={labelClass}>Monthly Household Income (Php)</label>
                  <input type="number" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Monthly Basic Needs Expenses (Php)</label>
                  <input type="number" name="monthlyBasicNeeds" value={formData.monthlyBasicNeeds} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Monthly Medical Expenses (Php)</label>
                  <input type="number" name="medicalExpenses" value={formData.medicalExpenses} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Occupation</label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Employment Status</label>
                  <select name="employmentStatus" value={formData.employmentStatus} onChange={handleChange} className={inputClass}>
                    <option>Employed</option>
                    <option>Self-Employed</option>
                    <option>Unemployed</option>
                    <option>Retired</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <input type="checkbox" name="catastrophicIllness" checked={formData.catastrophicIllness} onChange={handleChange} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded" />
                  <label className="ml-2 font-medium text-rose-700">Has Catastrophic Illness (Auto-classify as Indigent)</label>
                </div>
              </div>

              {/* Family Comp */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-slate-700">Family Composition</label>
                  <button type="button" onClick={addFamilyMember} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-sage-700 bg-sage-100 hover:bg-sage-200">
                    <Plus className="mr-1 h-3 w-3" /> Add Member
                  </button>
                </div>
                
                {formData.familyComposition.length > 0 ? (
                  <div className="overflow-x-auto rounded-lg border border-sage-200">
                    <table className="min-w-full divide-y divide-sage-200">
                      <thead className="bg-sage-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">Age</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">Rel.</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">Occupation</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase">Income</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-slate-500 uppercase"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-sage-200">
                        {formData.familyComposition.map((member, idx) => (
                          <tr key={member.id}>
                            <td className="px-2 py-1"><input type="text" value={member.name} onChange={(e) => updateFamilyMember(idx, 'name', e.target.value)} className="w-full border-0 focus:ring-0 text-sm p-1" placeholder="Name" /></td>
                            <td className="px-2 py-1"><input type="number" value={member.age} onChange={(e) => updateFamilyMember(idx, 'age', parseInt(e.target.value))} className="w-16 border-0 focus:ring-0 text-sm p-1" /></td>
                            <td className="px-2 py-1"><input type="text" value={member.relationship} onChange={(e) => updateFamilyMember(idx, 'relationship', e.target.value)} className="w-full border-0 focus:ring-0 text-sm p-1" placeholder="Relation" /></td>
                            <td className="px-2 py-1"><input type="text" value={member.occupation} onChange={(e) => updateFamilyMember(idx, 'occupation', e.target.value)} className="w-full border-0 focus:ring-0 text-sm p-1" placeholder="Job" /></td>
                            <td className="px-2 py-1"><input type="number" value={member.monthlyIncome} onChange={(e) => updateFamilyMember(idx, 'monthlyIncome', parseInt(e.target.value))} className="w-24 border-0 focus:ring-0 text-sm p-1" /></td>
                            <td className="px-2 py-1 text-right">
                              <button onClick={() => removeFamilyMember(idx)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="h-4 w-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No family members added.</p>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Findings & AI */}
        <div className="space-y-6">
          
          {/* Automatic Classification Engine */}
          <div className="bg-sage-800 rounded-2xl border border-sage-700 shadow-sm overflow-hidden text-white">
            <div className="bg-sage-900 px-5 py-4 border-b border-sage-700">
              <h3 className="text-lg font-semibold flex items-center">
                <Activity className="mr-2 h-5 w-5 text-clay-400" />
                Assessment Engine
              </h3>
            </div>
            <div className="p-5 space-y-4">
              
              <div>
                <p className="text-sm text-slate-400 mb-1">CLS Ratio</p>
                <div className="flex items-end">
                  <span className="text-3xl font-bold font-mono">{clsRatio.toFixed(2)}</span>
                  <span className="ml-2 text-xs text-slate-400 pb-1">Income / Expenses</span>
                </div>
              </div>

              <div className="pt-4 border-t border-sage-700">
                <p className="text-sm text-slate-400 mb-1">Classification Status</p>
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  classification === 'Indigent' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  classification === 'C1' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  classification === 'C2' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                  'bg-sage-500/20 text-sage-300 border border-sage-500/30'
                }`}>
                  {classification || 'Pending Data'}
                </div>
              </div>

              <div className="pt-4 border-t border-sage-700">
                <p className="text-sm text-slate-400 mb-1">Risk Level</p>
                <span className={`font-semibold ${
                  riskLevel === 'Critical' ? 'text-rose-400' :
                  riskLevel === 'High' ? 'text-orange-400' :
                  riskLevel === 'Moderate' ? 'text-amber-400' : 'text-sage-400'
                }`}>
                  {riskLevel || 'Pending Data'}
                </span>
              </div>

              <div className="pt-4 border-t border-sage-700">
                <p className="text-sm text-slate-400 mb-2">Recommendation</p>
                <p className="text-sm leading-relaxed text-slate-300">
                  {recommendation || 'Complete form to generate recommendation.'}
                </p>
              </div>

            </div>
          </div>

          {/* AI Narrative Generator */}
          <div className="bg-sage-50 rounded-2xl border border-sage-200 shadow-sm overflow-hidden">
            <div className="bg-sage-100/50 px-5 py-4 border-b border-sage-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-sage-900 flex items-center">
                <Wand2 className="mr-2 h-5 w-5 text-clay-500" />
                AI Narrative 
              </h3>
            </div>
            <div className="p-5">
              {narrative ? (
                <div className="space-y-4">
                  <div className="text-sm text-slate-700 bg-white p-4 rounded-lg border border-sage-100 shadow-inner min-h-[200px] whitespace-pre-wrap">
                    {narrative}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={generateNarrative} disabled={isGenerating} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-clay-500 hover:bg-clay-600 disabled:opacity-50">
                      {isGenerating ? <RefreshCw className="mr-1.5 h-3 w-3 animate-spin" /> : <RefreshCw className="mr-1.5 h-3 w-3" />} 
                      Regenerate
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(narrative)} className="inline-flex items-center px-3 py-1.5 border border-sage-200 text-xs font-medium rounded shadow-sm text-sage-700 bg-white hover:bg-sage-50">
                      <Copy className="mr-1.5 h-3 w-3" /> Copy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center mb-3">
                    <FileText className="h-6 w-6 text-clay-500" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">Generate a professional case summary based on the assessment data using AI.</p>
                  <button 
                    onClick={generateNarrative} 
                    disabled={isGenerating}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-clay-500 hover:bg-clay-600 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                    ) : (
                      <><Wand2 className="mr-2 h-4 w-4" /> Generate Narrative</>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden mt-6">
            <div className="bg-sage-50 px-5 py-4 border-b border-sage-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-[#2D4F3E] flex items-center">
                <FileText className="mr-2 h-5 w-5 text-clay-500" />
                Requirement Checklist
              </h3>
            </div>
            <div className="p-5">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                {(() => {
                  const ref = formData.referralSource;
                  const status = formData.patientType;
                  let reqs = ["None"];
                  
                  if (ref === "Outside Private") {
                      if (status === "IP") reqs = ["Photocopy of Request", "SW Referral", "Certificate of Confinement", "Social Case Study Report", "Certificate of Indigency", "Valid ID"];
                      else reqs = ["Photocopy of Request", "Medical Certificate", "Certificate of Indigency", "Valid ID"];
                  } else if (ref === "Outside Govt") {
                      if (status === "IP") reqs = ["Photocopy of Request", "Referral", "Certificate of Confinement", "Certificate of Indigency", "Valid ID"];
                  } else if (ref === "R2TMC") {
                      reqs = ["Medical Certificate / Abstract", "Valid ID", "Certificate of Indigency"];
                  }
                  
                  return reqs.map((req, i) => (
                    <li key={i}>{req}</li>
                  ));
                })()}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
