import React from 'react'
import { getDiagnosis, getDiagnosisData } from '../../api/patient';
import DoctorProfile from "../../components/DoctorCard";
import { verifyAuthentication } from '../../utils/verifyAuth';


export const getServerSideProps = async(ctx) => {
    const auth = verifyAuthentication(ctx.req);
    const id = ctx.query.id;
    if (!auth.state) {
        return {
          redirect : {
            destination : '/'
          }
        }
      }
    if (auth.decodedData.role!=='patient') {
        return {
          notFound : true
        }
    }
    try {
        const diagnosis = await getDiagnosisData(id);
        return {
            props : {diagnosis : diagnosis.data, user : auth.decodedData}
        }
    }catch(err) {
        console.log(err);
        return {
            notFound  :true
        }
    }
}

const Diagnose = ({diagnosis, user}) => {
    console.log(diagnosis);
  return (
    <div className='mt-12 flex justify-between px-10'>
        <div>
        <div className='text-xl font-semibold'>Diagnosis Report</div>

        <div className='mt-8'>
            <div className='font-medium'>Diagnosis</div>
            <div className='mt-2 text-sm'>
            <div><span className='font-semibold'>Predicted Disease : </span>{diagnosis.disease}</div>
                <div><span className='font-semibold'>Accuracy : </span>{diagnosis.accuracy}</div>
                <div><span className='font-semibold'>Doctors Found </span>{32}</div>
               
            </div>
        </div>

        <div className='mt-8'>
            <div className='font-medium'>Patient Details</div>
            <div className='mt-2 text-sm'>
                <div><span className='font-semibold'>Name : </span>{user.fullName}</div>
                <div><span className='font-semibold'>Age : </span>32</div>
                <div><span className='font-semibold'>Medical History : </span>2 Years</div>
            </div>
        </div>
        <div className='mt-8'>
            <div className='font-medium'>Symptoms</div>
            <div className='mt-2 text-sm'>
                {diagnosis.symptoms.split(',').map((s,idx)=>{
                    return <div>{idx+1}.  {" "} {s}</div>
                })}
            </div>
        </div>
        </div>
        <div className='w-[700px] '>
            <div className=' text-lg font-semibold'>Recommended Doctors</div>
            <div className='text-xs'>32 Doctors Found</div>
            <div className='mt-4 space-y-5 h-[400px] overflow-y-auto'>
                {/* <DoctorProfile/>
                <DoctorProfile/>
                <DoctorProfile/>
                <DoctorProfile/> */}
            </div>
        </div>
       
    </div>
  )
}

export default Diagnose