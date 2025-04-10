import React from "react";
import { Student } from "../types";
import { QRCodeSVG } from "qrcode.react";

interface CardTemplate2Props {
  student: Student;
  cardRef: React.RefObject<HTMLDivElement>;
}

const CardTemplate2: React.FC<CardTemplate2Props> = ({ student, cardRef }) => {
  return (
    <div 
      ref={cardRef}
      className="w-full max-w-sm mx-auto bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="flex p-4">
        <div className="bg-white rounded-lg p-2 shadow-md">
          <h3 className="text-lg font-bold text-indigo-700">UNITY</h3>
          <p className="text-xs text-indigo-500 font-semibold">SCHOOL</p>
        </div>
        <div className="ml-auto text-right">
          <h3 className="text-lg font-bold text-white">STUDENT ID</h3>
          <p className="text-xs text-white/80 font-medium">#{student.rollNumber.replace('R-', '')}</p>
        </div>
      </div>
      
      <div className="p-6 pt-2 flex">
        <div className="w-28 h-36 bg-white rounded-lg overflow-hidden shadow-md mr-4">
          {student.photo ? (
            <img 
              src={student.photo} 
              alt="Student Photo" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <i className="fas fa-user text-gray-400 text-3xl"></i>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3">
            <h3 className="text-xl font-bold text-white">{student.name}</h3>
            <div className="flex items-center mt-1">
              <div className="bg-white/20 rounded-md px-2 py-0.5">
                <p className="text-xs text-white">{student.rollNumber}</p>
              </div>
              <div className="mx-2 text-white/60">|</div>
              <div className="bg-white/20 rounded-md px-2 py-0.5">
                <p className="text-xs text-white">Class {student.class} {student.division}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center">
              <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                <i className="fas fa-bookmark text-indigo-600 text-xs"></i>
              </div>
              <div>
                <p className="text-white/80 text-xs">Rack Number</p>
                <p className="text-white text-sm font-medium">{student.rackNumber}</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 flex items-center">
              <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center mr-2">
                <i className="fas fa-bus text-indigo-600 text-xs"></i>
              </div>
              <div>
                <p className="text-white/80 text-xs">Bus Route</p>
                <p className="text-white text-sm font-medium">{student.busRoute}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 mb-4">
        {student.allergies && student.allergies.length > 0 && 
          student.allergies.map((allergy, index) => (
            <span 
              key={index} 
              className="inline-flex items-center mr-2 mb-2 px-2 py-0.5 rounded-full text-xs font-medium bg-white/90 text-red-600"
            >
              <i className="fas fa-exclamation-circle mr-1"></i> {allergy}
            </span>
          ))
        }
      </div>
      
      <div className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm">
        <div className="bg-white p-2 rounded-md">
          <QRCodeSVG 
            value={JSON.stringify(student)} 
            size={80} 
            level="M"
          />
        </div>
        
        <div className="text-right">
          <p className="text-xs text-white/80">Unity School</p>
          <p className="text-xs text-white/60">123 Education St., Knowledge City</p>
        </div>
      </div>
    </div>
  );
};

export default CardTemplate2;
