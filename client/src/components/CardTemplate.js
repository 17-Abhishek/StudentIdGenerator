
import React from "react";
import { QRCodeSVG } from "qrcode.react";

const CardTemplate = ({ student, templateNumber = 1 }) => {
  return (
    <div className="relative w-[340px] h-[210px] bg-white rounded-lg shadow-lg p-4 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{student.name}</h3>
          <p className="text-sm text-gray-600">{student.id}</p>
        </div>
        <div className="w-24 h-24">
          <QRCodeSVG value={student.id} size={96} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm">Class: {student.class}</p>
        <p className="text-sm">Roll: {student.roll}</p>
        <p className="text-sm">Blood Group: {student.bloodGroup}</p>
      </div>
      <div className="absolute bottom-2 right-2">
        <p className="text-xs text-gray-400">Valid until {student.validUntil}</p>
      </div>
    </div>
  );
};

export default CardTemplate;
