import React from "react";
import InfoBox from "../../components/Dashboard/InfoBox";


const Patient = () => {
  return (
    <div className="flex space-x-10 mt-10">
      <div className="p-4 bg-white h-fit">
        <div className="h-[190px] w-[190px] bg-purple-300 rounded-md"></div>
        <div className="mt-3 text-sm space-y-1">
        <div><span className="font-medium">Name : </span>Kunal Sangtiani</div>
        <div><span className="font-medium">Age : </span>17 Years Old</div>
        <div><span className="font-medium">Location : </span>Indore, India</div>
     
        </div>
      </div>
     <div className="grid grid-cols-2 gap-x-10 gap-y-6 grid-flow-row">
     <InfoBox
          src="/diagnosis.png"
          title="Diagnosis Reports"
          color="pink"
          width="450px"
        >
          <div className="text-gray-600">No Reports Found</div>
        </InfoBox>
        <InfoBox
          src="/medicalrecords.png"
          title="Medical Reports"
          color="green"
          width="450px"
        >
          <div className="text-gray-600">No Records Found</div>
        </InfoBox>
        <InfoBox
          src="/medicalrecords.png"
          title="Current Medication"
          color="green"
          width="450px"
        >
          <div className="text-gray-600">No Records Found</div>
        </InfoBox>
     </div>
    </div>
  );
};

export default Patient;
