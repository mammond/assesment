import React from 'react';
import { PatientData } from './types';

interface PrintFormProps {
  data: PatientData;
  classification: string;
}

export function PrintForm({ data, classification }: PrintFormProps) {
  return (
    <div className="hidden print:block font-serif text-[9px] leading-tight w-full bg-white text-black p-4" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      {/* Header */}
      <div className="flex items-center justify-center border-b-[3px] border-black pb-2 mb-2 relative">
        <div className="absolute left-8 flex gap-2">
            <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center text-[6px] font-bold text-center">DOH</div>
            <div className="w-14 h-14 rounded-full border-2 border-black flex items-center justify-center text-[6px] font-bold text-center">R2TMC</div>
        </div>
        
        <div className="text-center">
          <h1 className="font-bold text-lg leading-tight uppercase">Region II Trauma and Medical Center</h1>
          <p className="text-[10px]">Asian Highway 26, Barangay Magsaysay, Bayombong, 3700 Nueva Vizcaya</p>
          <h2 className="font-bold text-base mt-1 tracking-wide">MEDICAL SOCIAL WORK DEPARTMENT</h2>
        </div>
      </div>

      <div className="text-center font-bold text-lg my-2 tracking-wide">MSWD ASSESSMENT TOOL</div>
      
      <div className="flex justify-end mb-2 pr-8">
        <div className="flex flex-col items-center">
          <div className="w-48 text-center border-b border-black font-bold">{data.date}</div>
          <div className="text-[10px]">(Petsa)</div>
        </div>
      </div>

      <div className="text-center font-bold text-[11px] mb-2">PAGPAPATUNAY</div>
      
      <div className="text-justify indent-8 mb-8 text-[10px] leading-snug">
        Ako si <span className="inline-flex flex-col items-center mx-1 align-bottom"><span className="border-b border-black w-48 text-center h-4 font-bold">{data.patientName}</span><span className="text-[8px]">(Pangalan ng pasyente / kamag-anak)</span></span> 
        na <span className="inline-flex flex-col items-center mx-1 align-bottom"><span className="border-b border-black w-32 text-center h-4"></span><span className="text-[8px]">(Relasyon sa pasyente)</span></span> 
        ng pasyente na si <span className="inline-flex flex-col items-center mx-1 align-bottom"><span className="border-b border-black w-48 text-center h-4 font-bold">{data.patientName}</span><span className="text-[8px]">(Pangalan ng pasyente)</span></span>
        bilang pagsunod sa patakaran ng ospital na ito, ay kusang loob na nagbigay ng tamang impormasyon ukol sa aking pangkabuhayan 
        at ng aming pamilya. Lubos kong naiintindihan ang aking/aming paglapit o paghingi ng tulong sa Medical Social Work Department.
        Ako/kami ay sumasang-ayon batay sa pag-aaral at pagsusuri na ipinatutupad ng naturang opisina. Anumang maling impormasyon na 
        akin/amin naibigay ay maaaring dahilan ng hindi pagtanggap ng tulong mula sa kanilang tanggapan at nangangahulugan na ako/kami 
        ay magiging responsable sa pagbabayad ng doble sa lahat ng gastusin ng pagpapaospital ng nasabing pasyente na naaayon sa batas 
        (R.A. 747 Section 5).
      </div>

      <div className="flex justify-between px-16 mb-2">
        <div className="text-center w-48 border-t border-black pt-1 font-bold">Pasyente / Kamag-Anak</div>
        <div className="text-center w-48 border-t border-black pt-1 relative">
          <div className="absolute bottom-full left-0 w-full text-center mb-1 font-bold">{data.assignedSocialWorker}</div>
          <span className="font-bold">Medical Social Worker</span>
        </div>
      </div>

      {/* The Big Table */}
      <div className="border-[1.5px] border-black w-full flex flex-col mt-2">
        {/* Row 1 */}
        <div className="flex border-b border-black">
          <div className="w-1/4 border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">DATE OF INTERVIEW:</span>
            <span className="mt-1 font-bold">{data.date}</span>
          </div>
          <div className="w-[35%] border-r border-black flex">
            <div className="flex-1 flex flex-col">
              <span className="font-bold text-[8px] border-b border-black p-1">DATE OF ADMISSION / CONSULTATION: <span className="font-normal ml-2">{data.dateAdmitted}</span></span>
              <div className="flex-1 flex">
                <div className="w-1/2 border-r border-black flex flex-col">
                  <div className="flex-1 flex border-b border-black"><span className="w-8 border-r border-black px-1 font-bold text-[8px] flex items-center">IN</span><span className="flex-1 px-1 flex items-center justify-center font-bold">{data.patientType === 'IP' ? '✓' : ''}</span></div>
                  <div className="flex-1 flex border-b border-black"><span className="w-8 border-r border-black px-1 font-bold text-[8px] flex items-center">OPD</span><span className="flex-1 px-1 flex items-center justify-center font-bold">{data.patientType === 'OPD' ? '✓' : ''}</span></div>
                  <div className="flex-1 flex"><span className="w-8 border-r border-black px-1 font-bold text-[8px] flex items-center">ER</span><span className="flex-1 px-1 flex items-center justify-center font-bold">{data.patientType === 'ER' ? '✓' : ''}</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/4 border-r border-black p-1">
            <span className="font-bold text-[8px]">HOSPITAL NUMBER:</span><br/>
            <span className="text-sm font-bold ml-2">{data.hospitalNumber}</span>
          </div>
          <div className="w-[15%] p-1 flex flex-col">
            <span className="font-bold text-[8px]">MSWD NO:</span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex border-b border-black min-h-[30px]">
          <div className="w-[40%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">SOURCE OF REFERRAL<br/>NAME: <span className="font-normal text-[9px] ml-2">{data.referralSource}</span></span>
          </div>
          <div className="w-[40%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">ADDRESS</span>
          </div>
          <div className="w-[20%] p-1 flex flex-col">
            <span className="font-bold text-[8px]">TEL NO.</span>
            <span className="font-bold">{data.contactNumber}</span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex border-b border-black min-h-[20px] items-center">
          <div className="w-[45%] border-r border-black p-1 font-bold text-[9px]">I. DEMOGRAPHIC DATA</div>
          <div className="w-[55%] p-1 font-bold text-[9px]">INFORMANT / RELATIONSHIP TO PATIENT</div>
        </div>

        {/* Row 4 */}
        <div className="flex border-b border-black">
          <div className="w-[40%] border-r border-black flex flex-col">
            <div className="text-center font-bold border-b border-black p-1 text-[8px]">PATIENT'S NAME</div>
            <div className="flex flex-1 min-h-[30px]">
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end"><span className="text-center w-full uppercase font-bold text-[10px]">{data.patientName?.split(' ').pop()}</span><span className="text-[7px] font-bold">Surname</span></div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end"><span className="text-center w-full uppercase font-bold text-[10px]">{data.patientName?.split(' ').shift()}</span><span className="text-[7px] font-bold">First</span></div>
              <div className="flex-1 text-center p-1 flex flex-col justify-end"><span className="text-center w-full uppercase font-bold text-[10px]"></span><span className="text-[7px] font-bold">Middle</span></div>
            </div>
          </div>
          <div className="w-[5%] border-r border-black p-1 flex flex-col items-center">
            <span className="font-bold text-[8px]">AGE</span>
            <span className="mt-auto font-bold text-[10px]">{data.age}</span>
          </div>
          <div className="w-[5%] border-r border-black p-1 flex flex-col items-center">
            <span className="font-bold text-[8px]">SEX</span>
          </div>
          <div className="w-[10%] border-r border-black flex flex-col">
            <div className="text-center font-bold border-b border-black p-1 text-[8px]">GENDER</div>
            <div className="flex flex-1">
              <div className="w-1/2 text-center border-r border-black p-1 flex flex-col justify-end items-center"><span className="font-bold text-sm leading-none">{data.sex === 'Female' ? '✓' : ''}</span><span className="text-[8px] font-bold">F</span></div>
              <div className="w-1/2 text-center p-1 flex flex-col justify-end items-center"><span className="font-bold text-sm leading-none">{data.sex === 'Male' ? '✓' : ''}</span><span className="text-[8px] font-bold">M</span></div>
            </div>
          </div>
          <div className="w-[40%] flex flex-col">
            <div className="text-center font-bold border-b border-black p-1 text-[8px]">CIVIL STATUS</div>
            <div className="flex flex-1">
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end items-center"><span className="font-bold text-sm leading-none">{data.civilStatus === 'Single' ? '✓' : ''}</span><span className="font-bold text-[8px]">S</span></div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end items-center"><span className="font-bold text-[8px]">CL</span></div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end items-center"><span className="font-bold text-sm leading-none">{data.civilStatus === 'Married' ? '✓' : ''}</span><span className="font-bold text-[8px]">M</span></div>
              <div className="flex-[2] border-r border-black flex flex-col">
                <div className="text-center font-bold border-b border-black text-[7px] leading-tight">SEP</div>
                <div className="flex flex-1">
                  <div className="w-1/2 text-center border-r border-black text-[7px] flex flex-col justify-end font-bold pb-1">In-<br/>fact</div>
                  <div className="w-1/2 text-center text-[7px] flex flex-col justify-end font-bold pb-1">Legal</div>
                </div>
              </div>
              <div className="flex-1 text-center p-1 flex flex-col justify-end items-center"><span className="font-bold text-sm leading-none">{data.civilStatus === 'Widowed' ? '✓' : ''}</span><span className="font-bold text-[8px]">W</span></div>
            </div>
          </div>
        </div>

        {/* Row 5 */}
        <div className="flex border-b border-black min-h-[30px]">
          <div className="w-[45%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px] text-center">PERMANENT ADDRESS</span>
            <span className="text-center mt-1 font-bold">{data.address}</span>
          </div>
          <div className="w-[30%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px] text-center">TEMPORARY ADDRESS</span>
          </div>
          <div className="w-[12.5%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px] text-center">DATE OF BIRTH</span>
          </div>
          <div className="w-[12.5%] p-1 flex flex-col">
            <span className="font-bold text-[8px] text-center">PLACE OF BIRTH</span>
          </div>
        </div>

        {/* Row 6 */}
        <div className="flex border-b border-black min-h-[30px]">
          <div className="w-[75%] border-r border-black p-1 flex flex-col justify-center">
            <span className="font-bold text-[7px] text-center mb-1">KIND OF LIVING ARRANGEMENT</span>
            <div className="flex justify-around items-center">
              <span className="flex items-center gap-1 text-[8px]"><div className="w-2 h-2 border border-black flex items-center justify-center text-[7px] font-bold">{data.livingCondition === 'Own House' ? '✓' : ''}</div> Owned</span>
              <span className="flex items-center gap-1 text-[8px]"><div className="w-2 h-2 border border-black flex items-center justify-center text-[7px] font-bold">{data.livingCondition === 'Rent' ? '✓' : ''}</div> Rent</span>
              <span className="flex items-center gap-1 text-[8px]"><div className="w-2 h-2 border border-black flex items-center justify-center text-[7px] font-bold"></div> Shared</span>
              <span className="flex items-center gap-1 text-[8px]"><div className="w-2 h-2 border border-black flex items-center justify-center text-[7px] font-bold"></div> Homeless</span>
              <span className="flex items-center gap-1 text-[8px]"><div className="w-2 h-2 border border-black flex items-center justify-center text-[7px] font-bold"></div> Institution</span>
            </div>
          </div>
          <div className="w-[25%] p-1 flex flex-col">
            <span className="font-bold text-[8px]">RELIGION</span>
            <span className="mt-1 font-bold ml-2">{data.religion}</span>
          </div>
        </div>

        {/* Row 7 */}
        <div className="flex border-b border-black min-h-[30px]">
          <div className="w-[20%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">EDUC. ATTAINMENT</span>
            <span className="font-bold">{data.education}</span>
          </div>
          <div className="w-[20%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">OCCUPATION</span>
            <span className="font-bold">{data.occupation}</span>
          </div>
          <div className="w-[30%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">EMPLOYER & CONTACT NUMBER</span>
          </div>
          <div className="w-[15%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">INCOME</span>
            <span className="font-bold">₱ {data.monthlyIncome}</span>
          </div>
          <div className="w-[15%] p-1 flex flex-col">
            <span className="font-bold text-[8px]">PER CAPITA INCOME</span>
            <span className="font-bold">₱ {data.monthlyIncome && data.householdSize ? (data.monthlyIncome / data.householdSize).toFixed(2) : ''}</span>
          </div>
        </div>

        {/* Row 8 */}
        <div className="flex border-b border-black">
          <div className="w-[50%] border-r border-black flex flex-col">
            <div className="text-center font-bold border-b border-black p-1 text-[8px]">PHILHEALTH</div>
            <div className="flex flex-1 min-h-[30px]">
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[7px]">OFW</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[7px]">Employed</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[7px]">Voluntary</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[7px]">Sponsored</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[7px]">4Ps</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[7px]">POC</div>
              <div className="flex-1 text-center p-1 flex flex-col justify-end font-bold text-[7px]">Lifetime</div>
            </div>
          </div>
          <div className="w-[50%] flex flex-col">
            <div className="text-center font-bold border-b border-black p-1 text-[8px]">MSWD CLASSIFICATION</div>
            <div className="flex flex-1 min-h-[30px]">
              <div className="flex-[2] border-r border-black flex flex-col">
                <div className="text-center font-bold border-b border-black text-[7px]">PAY</div>
                <div className="flex flex-1">
                  <div className="w-1/2 text-center border-r border-black text-[7px] flex flex-col justify-end font-bold">A</div>
                  <div className="w-1/2 text-center text-[7px] flex flex-col justify-end font-bold">B</div>
                </div>
              </div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[8px] relative"><span className="absolute top-1 w-full text-center text-sm">{classification === 'B SVC' ? '✓' : ''}</span>B SVC</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[8px] relative"><span className="absolute top-1 w-full text-center text-sm">{classification === 'C1' ? '✓' : ''}</span>C1</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[8px] relative"><span className="absolute top-1 w-full text-center text-sm">{classification === 'C2' ? '✓' : ''}</span>C2</div>
              <div className="flex-1 text-center border-r border-black p-1 flex flex-col justify-end font-bold text-[8px] relative"><span className="absolute top-1 w-full text-center text-sm">{classification === 'C3' ? '✓' : ''}</span>C3</div>
              <div className="flex-1 text-center p-1 flex flex-col justify-end font-bold text-[8px] relative"><span className="absolute top-1 w-full text-center text-sm">{classification === 'Indigent' ? '✓' : ''}</span>D</div>
            </div>
          </div>
        </div>

        {/* Row 9 */}
        <div className="flex border-b border-black flex-col">
          <div className="text-center font-bold border-b border-black p-1 text-[8px]">SECTORAL GROUPING</div>
          <div className="flex min-h-[30px]">
            {['Senior\nCitizen', 'Veteran', 'Barangay\nOfficial', 'Brgy. Health\nWorker', 'VAWC', 'Inmate', 'Indigenous\nPeople', 'PWD', 'Abandoned', 'Public\nHealth\nWorker', "Gov't.\nWorker"].map((item, i, arr) => (
              <div key={i} className={`flex-1 text-center ${i !== arr.length - 1 ? 'border-r' : ''} border-black p-1 flex flex-col justify-end font-bold text-[7px] whitespace-pre-wrap leading-tight`}>{item}</div>
            ))}
          </div>
        </div>

        {/* Row 10 */}
        <div className="flex border-b border-black min-h-[30px]">
          <div className="w-[35%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px] text-center">INFORMANT (Name)</span>
          </div>
          <div className="w-[25%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px] text-center">RELATION TO PATIENT</span>
          </div>
          <div className="w-[40%] p-1 flex flex-col">
            <span className="font-bold text-[8px] text-center">ADDRESS OF INFORMANT/CONTACT NO.</span>
          </div>
        </div>

        {/* Row 11 */}
        <div className="flex border-b border-black flex-col">
          <div className="text-center font-bold border-b border-black p-1 text-[8px] bg-gray-100">FAMILY COMPOSITION</div>
          <div className="flex border-b border-black">
            <div className="w-[30%] border-r border-black p-1 text-center font-bold text-[8px]">NAME (Surname, First, Middle)</div>
            <div className="w-[5%] border-r border-black p-1 text-center font-bold text-[8px]">AGE</div>
            <div className="w-[10%] border-r border-black p-1 text-center font-bold text-[8px]">CIVIL<br/>STATUS</div>
            <div className="w-[15%] border-r border-black p-1 text-center font-bold text-[8px]">RELATIONSHIP<br/>TO PATIENT</div>
            <div className="w-[15%] border-r border-black p-1 text-center font-bold text-[8px]">EDUCATIONAL<br/>ATTAINMENT</div>
            <div className="w-[15%] border-r border-black p-1 text-center font-bold text-[8px]">OCCUPATION</div>
            <div className="w-[10%] p-1 text-center font-bold text-[8px]">MONTHLY<br/>INCOME</div>
          </div>
          {[0, 1, 2, 3, 4, 5].map((i, idx, arr) => {
            const member = data.familyComposition?.[i];
            return (
              <div key={i} className={`flex min-h-[20px] ${idx !== arr.length - 1 ? 'border-b' : ''} border-black`}>
                <div className="w-[30%] border-r border-black px-1 flex items-center font-bold">{member?.name || ''}</div>
                <div className="w-[5%] border-r border-black px-1 flex items-center justify-center font-bold">{member?.age || ''}</div>
                <div className="w-[10%] border-r border-black px-1 flex items-center justify-center font-bold"></div>
                <div className="w-[15%] border-r border-black px-1 flex items-center justify-center font-bold">{member?.relationship || ''}</div>
                <div className="w-[15%] border-r border-black px-1 flex items-center justify-center font-bold"></div>
                <div className="w-[15%] border-r border-black px-1 flex items-center justify-center font-bold">{member?.occupation || ''}</div>
                <div className="w-[10%] px-1 flex items-center justify-end font-bold">{member?.monthlyIncome || ''}</div>
              </div>
            )
          })}
        </div>

        {/* Row 12 */}
        <div className="flex border-b border-black min-h-[20px] items-center">
          <div className="w-[45%] border-r border-black px-1 font-bold text-[8px]">OTHER SOURCES OF INCOME:</div>
          <div className="w-[30%] border-r border-black px-1 font-bold text-[8px]">HOUSEHOLD SIZE: <span className="font-bold text-sm ml-2">{data.householdSize}</span></div>
          <div className="w-[25%] px-1 font-bold text-[8px]">TOTAL FAMILY INCOME: <span className="font-bold text-sm ml-2">₱ {data.monthlyIncome}</span></div>
        </div>

        {/* Row 13 */}
        <div className="flex border-b border-black min-h-[20px] items-center">
          <div className="w-[45%] border-r border-black px-1 font-bold text-[8px]">MONTHLY EXPENSES:</div>
          <div className="w-[55%] px-1 font-bold text-[8px]">TOTAL MONTHLY EXPENDITURE: <span className="font-bold text-sm ml-2">₱ {Number(data.monthlyBasicNeeds) + Number(data.medicalExpenses) || ''}</span></div>
        </div>

        {/* Row 14 */}
        <div className="flex border-b border-black min-h-[40px]">
          <div className="w-[20%] border-r border-black p-1 flex flex-col font-bold text-[8px]">HOUSE & LOT</div>
          <div className="w-[25%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px] mb-1">LIGHT SOURCE</span>
            <div className="grid grid-cols-2 gap-1 text-[8px]">
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Candle</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Electric</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Kerosene</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> None</span>
            </div>
          </div>
          <div className="w-[25%] border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px] mb-1">WATER SOURCE</span>
            <div className="grid grid-cols-2 gap-1 text-[8px]">
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Deep well</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Artesian Well</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Water District</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Public</span>
            </div>
          </div>
          <div className="w-[30%] p-1 flex flex-col">
            <span className="font-bold text-[8px] mb-1">FUEL SOURCE</span>
            <div className="grid grid-cols-3 gap-1 text-[8px]">
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> LPG</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Kerosene</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Electric</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Charcoal</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 border border-black"></div> Firewood</span>
            </div>
          </div>
        </div>

        {/* Row 15 */}
        <div className="flex border-b border-black">
          <div className="flex-[1.5] p-1 border-r border-black flex flex-col font-bold text-[7px] min-h-[30px]">FOOD</div>
          <div className="flex-1 p-1 border-r border-black flex flex-col font-bold text-[7px] min-h-[30px]">EDUCATION</div>
          <div className="flex-1 p-1 border-r border-black flex flex-col font-bold text-[7px] min-h-[30px]">PHONE</div>
          <div className="flex-[1.5] p-1 border-r border-black flex flex-col font-bold text-[7px] min-h-[30px]">CLOTHING</div>
          <div className="flex-[1.5] p-1 border-r border-black flex flex-col font-bold text-[7px] min-h-[30px]">TRANSPORTATION</div>
          <div className="flex-[2] p-1 border-r border-black flex flex-col font-bold text-[7px] min-h-[30px]">MEDICAL<br/>EXPENDITURE<br/><span className="font-bold text-[9px] mt-auto">₱ {data.medicalExpenses}</span></div>
          <div className="flex-[1.5] p-1 border-r border-black flex flex-col font-bold text-[7px] min-h-[30px]">INSURANCE</div>
          <div className="flex-[1.5] p-1 flex flex-col font-bold text-[7px] min-h-[30px]">HOUSEHELP</div>
        </div>

        {/* Row 16 */}
        <div className="flex border-b border-black bg-gray-100 min-h-[20px] items-center px-1 font-bold text-[9px]">
          II. MEDICAL DATA
        </div>

        {/* Row 17 */}
        <div className="flex border-b border-black min-h-[40px]">
          <div className="w-1/2 border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">ADMITTING DIAGNOSIS</span>
            <span className="font-bold mt-1 text-[10px]">{data.finalDiagnosis}</span>
          </div>
          <div className="w-1/2 p-1 flex flex-col">
            <span className="font-bold text-[8px]">FINAL DIAGNOSIS</span>
            <span className="font-bold mt-1 text-[10px]">{data.finalDiagnosis}</span>
          </div>
        </div>

        {/* Row 18 */}
        <div className="flex border-b border-black min-h-[40px]">
          <div className="w-1/2 border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">DURATION OF PROBLEM/SYMPTOMS</span>
            <span className="font-bold mt-1 text-[10px]">{data.chiefComplaint}</span>
          </div>
          <div className="w-1/2 p-1 flex flex-col">
            <span className="font-bold text-[8px]">PREVIOUS TREATMENT/ DURATION</span>
          </div>
        </div>

        {/* Row 19 */}
        <div className="flex min-h-[40px]">
          <div className="w-1/2 border-r border-black p-1 flex flex-col">
            <span className="font-bold text-[8px]">PRESENT TREATMENT PLAN:</span>
            <span className="font-bold mt-1 text-[10px]">{data.purpose.join(', ')}</span>
          </div>
          <div className="w-1/2 p-1 flex flex-col">
            <span className="font-bold text-[8px]">HEALTH ACCESSIBILITY PROBLEM</span>
          </div>
        </div>

      </div>
    </div>
  )
}
