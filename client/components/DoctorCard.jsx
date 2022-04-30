import cls from "classnames";
import Image from "next/image";
import { useState } from "react";
import { MdHome, MdPhone } from "react-icons/md";
import { useRouter } from "next/router";
import AppointDoctorModal from "./AppointDoctorModal";



const Tag = ({ title }) => {
    return (
      <span className="text-[0.6rem] px-2 py-1 bg-gray-300 rounded-lg">
        {title}
      </span>
    );
  };
  const DoctorProfile = ({doctor, handleAppoint, role,patientId, appointedDoctors}) => {
    const [show,setShow] = useState(false);

   

    const ActionButton = ()=>{
      let isAppointed = false;
      isAppointed = appointedDoctors?.filter(app=>{
        if (app.doctor.uuid===doctor.uuid) return app.state;
      });
      if (isAppointed?.length>0) isAppointed = isAppointed[0].state;
      else isAppointed = false;
      let text = `Appointment Dr. ${doctor.user.fullName.split(' ')[0]}`;
      if (isAppointed && isAppointed==='active') text = 'Active Appointment';
      else if (isAppointed) text = `Request ${isAppointed}`
      
       return (
        <>
        {role==='patient'&&<button disabled={isAppointed} onClick={()=>handleAppoint(doctor.uuid)} className={cls('text-[0.7rem]  bg-opacity-90 hover:bg-opacity-100 w-fit p-1 border-[1px] text-white rounded-md px-2', {'bg-primary' : !isAppointed}, {'bg-gray-700' : isAppointed==='pending'}, {'bg-green-600' : isAppointed==='active'}, {'bg-red-500' : isAppointed==='rejected'})}>
                  {text}
        </button>}
        </>
      )

    }

    return (
      <>
      <AppointDoctorModal show={show} onClose={()=>setShow(false)} patientId={patientId} doctorId={doctor.uuid}/>
      <div className="flex items-center rounded-md w-full p-2 px-2 bg-slate-50  border-[1px]  border-gray-400">
        <div className="flex space-x-5 items-center w-full">
          <div className="pt-1 rounded-md">
            <Image
              className="rounded-lg"
              src={doctor.user.img}
              height={160}
              width={160}
            />
          </div>
          <div className="flex justify-between w-full">
            <div>
              <div className="text-sm font-semibold">{doctor.user.fullName}</div>
              <div className="text-[0.7rem] text-gray-500 mt-1">
                I'm the best doctor in the holy fucking world
              </div>
              <hr className="border-gray-400 my-2" />
              <div className="flex space-x-3 ">
                <Tag title="dentistry" />
                <Tag title="Heart" />
                <Tag title="Dieasease" />
              </div>
              <div className="mt-4 flex space-x-3 items-center">
          <ActionButton/>
                <div className="text-[0.7rem] border-primary border-[1px] text-primary bg-opacity-90 hover:bg-opacity-100 w-fit p-1  rounded-md px-2">
                  View Profile
                </div>
              </div>
            </div>
            <div>
              <div className="w-[190px] space-y-2 px-3">
                <div className="flex space-x-2">
                  <MdHome className="text-primary" />
                  <div className="text-[0.7rem]">
                    {doctor.address}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <MdPhone className="text-primary" size={15} />
                  <div className="text-[0.7rem]">{doctor.user.contact}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  };

  export default DoctorProfile;