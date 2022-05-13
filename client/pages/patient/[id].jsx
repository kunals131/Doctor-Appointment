import React from "react";
import { allPatientDetailsAPI } from "../../api/patient";
import InfoBox from "../../components/Dashboard/InfoBox";
import DiagnosisCard from "../../components/ProfileCards.jsx/DiagnosisCard";
import MedicalRecordCard from "../../components/ProfileCards.jsx/MedicalRecordCard";
import { verifyAuthentication } from "../../utils/verifyAuth";




export const getServerSideProps = async(ctx) => {
  const auth = verifyAuthentication(ctx.req);
  if (!auth.state) {
    return {
      redirect : {
        destination : '/'
      }
    }
  }
  const {id} = ctx.query;
  try {
    const result = await allPatientDetailsAPI(id);
    return {props : {patient : result.data}}
  }catch(err) {
    return {
      notFound : true
    }
  }

};

const Patient = ({patient}) => {

  return (
    <div className="flex space-x-10 mt-10">
      <div className="p-4 bg-white h-fit">
        <div className="h-[190px] w-[190px] bg-purple-300 rounded-md" style={{background : `url(${patient.user.img}) center center/cover`}}></div>
        <div className="mt-3 text-sm space-y-1">
        <div><span className="font-medium">Name : </span>{patient.user.fullName}</div>
        <div><span className="font-medium">Age : </span>{patient.age} Years Old</div>
        <div><span className="font-medium">Medical History : </span>{patient.medicalHistory} years </div>
     
        </div>
      </div>
     <div className="grid grid-cols-2 gap-x-10 gap-y-6 grid-flow-row">
     <InfoBox
          src="/diagnosis.png"
          title="Diagnosis Reports"
          color="pink"
          width="450px"
        >
         {patient.diagnoses.length>0?patient.diagnoses.map(diagnosis=><DiagnosisCard diagnosis={diagnosis}/>): <div className="text-gray-600">No Reports Found</div>}
        </InfoBox>
        <InfoBox
          src="/medicalrecords.png"
          title="Medical Reports"
          color="green"
          width="450px"
        >
          {patient.medicalRecords.length>0?patient.medicalRecords.map(record=><MedicalRecordCard record={record}/>):<div className="text-gray-600">No Records Found</div>}
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
