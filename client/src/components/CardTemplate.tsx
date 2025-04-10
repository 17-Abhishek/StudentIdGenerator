import { StudentData } from '../types/student';
import { QRCodeSVG } from 'qrcode.react';

interface CardTemplateProps {
  studentData: StudentData;
  templateVersion: '1' | '2';
  cardRef: React.RefObject<HTMLDivElement>;
}

export default function CardTemplate({ 
  studentData, 
  templateVersion, 
  cardRef 
}: CardTemplateProps) {
  const formattedDate = new Date().toLocaleDateString();
  
  // Classic Template
  if (templateVersion === '1') {
    return (
      <div 
        ref={cardRef}
        id="card-preview-1"
        className="card-preview bg-gradient-to-b from-white to-[#f3f4f6] rounded-lg shadow-lg overflow-hidden mx-auto"
        style={{ width: '350px', height: '540px' }}
      >
        <div className="bg-primary text-white py-3 px-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">STUDENT ID</h3>
            <div className="text-sm font-medium">2023-24</div>
          </div>
          <div className="text-sm font-medium">Unity School</div>
        </div>
        
        <div className="p-4 flex flex-col h-[calc(100%-64px)]">
          <div className="flex gap-4 mb-4">
            <div className="w-28 h-36 bg-gray-100 rounded-md overflow-hidden">
              {studentData.photo && (
                <img src={studentData.photo} alt="Student photo" className="w-full h-full object-cover" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">{studentData.name}</h3>
              <div className="space-y-1 text-sm">
                <div className="flex">
                  <span className="w-20 text-gray-500">Roll No:</span>
                  <span className="font-medium">{studentData.rollNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-500">Class:</span>
                  <span className="font-medium">{`${studentData.class} ${studentData.division}`}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-500">Rack No:</span>
                  <span className="font-medium">{studentData.rackNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-500">Bus Route:</span>
                  <span className="font-medium">{studentData.busRoute}</span>
                </div>
              </div>
            </div>
          </div>
          
          {studentData.allergies && studentData.allergies.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1 text-red-600">Allergies:</h4>
              <div className="flex flex-wrap gap-1">
                {studentData.allergies.map((allergy) => (
                  <span 
                    key={allergy} 
                    className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-auto flex items-end justify-between">
            <div className="text-xs text-gray-500">
              <div>ID: <span>{studentData.id}</span></div>
              <div>Issue Date: <span>{formattedDate}</span></div>
            </div>
            <div className="bg-white p-1 rounded shadow-sm">
              <QRCodeSVG 
                value={JSON.stringify(studentData)} 
                size={96} 
                className="w-24 h-24"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Modern Template
  return (
    <div 
      ref={cardRef}
      id="card-preview-2"
      className="card-preview bg-gradient-to-tr from-[#4F46E5] to-[#1D4ED8] rounded-lg shadow-lg overflow-hidden mx-auto"
      style={{ width: '350px', height: '540px' }}
    >
      <div className="p-6 h-full flex flex-col text-white">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Unity School</h3>
          <div className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">ID CARD</div>
        </div>
        
        <div className="flex justify-center mb-4">
          <div className="w-28 h-36 bg-white/10 rounded-md overflow-hidden shadow-md">
            {studentData.photo && (
              <img src={studentData.photo} alt="Student photo" className="w-full h-full object-cover" />
            )}
          </div>
        </div>
        
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-1">{studentData.name}</h3>
          <div className="text-white/80 text-sm">
            <span>{`${studentData.class} ${studentData.division}`}</span> • 
            <span>{` Roll No: ${studentData.rollNumber}`}</span>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="text-white/60">Rack No:</span>
            </div>
            <div className="font-medium">{studentData.rackNumber}</div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-white/60">Valid:</span>
            </div>
            <div className="font-medium">2023-24</div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-white/60">Bus Route:</span>
            </div>
            <div className="font-medium">{studentData.busRoute}</div>
          </div>
        </div>
        
        {studentData.allergies && studentData.allergies.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Allergies:</span>
            </h4>
            <div className="flex flex-wrap gap-1">
              {studentData.allergies.map((allergy) => (
                <span 
                  key={allergy} 
                  className="bg-red-500/30 text-white text-xs px-2 py-0.5 rounded-full"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-auto flex items-end justify-center">
          <div className="bg-white p-2 rounded shadow-sm inline-block">
            <QRCodeSVG 
              value={JSON.stringify(studentData)} 
              size={96} 
              className="w-24 h-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
