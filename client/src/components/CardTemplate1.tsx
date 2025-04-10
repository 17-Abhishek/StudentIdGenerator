import React from "react";
import { Student } from "../types";
import { QRCodeSVG } from "qrcode.react";

interface CardTemplate1Props {
  student: Student;
  cardRef: React.RefObject<HTMLDivElement>;
}

const CardTemplate1: React.FC<CardTemplate1Props> = ({ student, cardRef }) => {
  return (
    <div 
      ref={cardRef}
      className="w-full max-w-sm mx-auto bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200"
    >
      <div className="bg-primary py-4 px-6 text-white text-center">
        <h3 className="text-lg font-bold">UNITY SCHOOL</h3>
        <p className="text-xs uppercase tracking-wider">Student Identification Card</p>
      </div>
      
      <div className="p-6 flex flex-col items-center">
        <div className="w-32 h-40 bg-gray-100 border border-gray-200 rounded-md overflow-hidden mb-4">
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
        
        <div className="text-center w-full mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{student.name}</h3>
          <p className="text-sm text-gray-600 mb-2">
            {student.rollNumber} | Class {student.class} {student.division}
          </p>
          
          <div className="flex flex-wrap justify-center mt-2 gap-1">
            {student.allergies && student.allergies.length > 0 && 
              student.allergies.map((allergy, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                >
                  <i className="fas fa-exclamation-circle mr-1"></i> {allergy}
                </span>
              ))
            }
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-500 text-xs mb-1">Rack Number</p>
            <p className="font-medium">{student.rackNumber}</p>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <p className="text-gray-500 text-xs mb-1">Bus Route</p>
            <p className="font-medium">{student.busRoute}</p>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center">
          <div className="p-2 bg-white border border-gray-200 rounded-md">
            <QRCodeSVG 
              value={JSON.stringify(student)} 
              size={96} 
              level="M"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-100 py-3 px-6 text-center text-xs text-gray-600">
        <p>&copy; {new Date().getFullYear()} Unity School. This ID is property of the school.</p>
        <p>If found, please return to Unity School Administration.</p>
      </div>
    </div>
  );
};

export default CardTemplate1;
