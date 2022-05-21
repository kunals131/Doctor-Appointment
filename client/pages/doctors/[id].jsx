import React, { useEffect, useState } from "react";
import { MdPhone, MdEmail, MdHome, MdPersonPin, MdLocalMall, MdFeed, MdReviews } from "react-icons/md";
import { useDispatch } from "react-redux";
import { createAppointmentAPI, getAllUserDetailsAPI } from "../../api/common";
import { getDoctorDetailsAPI } from "../../api/doctor";
import { getAllAppointments } from "../../api/patient";
import DoctorProfile from "../../components/DoctorCard";
import { updateUser } from "../../redux/actions/user";
import { verifyAuthentication } from "../../utils/verifyAuth";
import cls from 'classnames'

const sortFunc = function(a, b) {
  var keyA = new Date(a.createdAt),
    keyB = new Date(b.createdAt);
  // Compare the 2 dates
  if (keyA < keyB) return 1;
  if (keyA > keyB) return -1;
  return 0;
}


const DetailCard = ({title,info})=>(
    <div className="bg-mainBackground w-full h-auto p-2 rounded-lg">
        <div className="text-sm font-semibold text-gray-600">{title} : </div>
        <div className="mt-1">{info}</div>
    </div>
)
export const getServerSideProps = async(ctx) => {
  const auth = verifyAuthentication(ctx.req);
  if (!auth.state) {
    return {
      redirect : {
        destination : '/'
      }
    }
  }
  const userData = await getAllUserDetailsAPI(auth.decodedData.uuid);
  auth.decodedData = userData.data;
  if (auth.decodedData.isNew) return {redirect : {destination : '/new'}}
  console.log(ctx.query.id);

  try {
  const doctorDetails = await getDoctorDetailsAPI(ctx.query.id);
  if (auth.decodedData.role==='patient') {
    let results = await getAllAppointments(auth.decodedData.additionalData.uuid);
    return {props:{user : auth.decodedData, doctor : doctorDetails.data, appointedDoctors : results.data}}
  }
  return {props:{user : auth.decodedData, doctor : doctorDetails.data}}
  }catch(err) {
    console.log(err);
    return {
      notFound : true
    }
  }
}


const Tag = ({title})=>(
<span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
  {title}
</span>
)



const Profile = ({user,doctor, appointedDoctors}) => {
  const dispatch=  useDispatch();
  useEffect(()=>{
    dispatch(updateUser(user));
  }, [])
  const [appointmentState, setAppointmentState] = useState(false);
  const handleClick = async ()=>{
    try {
      const res=  await createAppointmentAPI(user.additionalData.uuid, doctor.uuid);
      console.log(res);
      setAppointmentState('pending')
    }catch(err) {
      console.log(err.response.data.message)
    }
  }
  useEffect(()=>{
    if (user.role==='patient') {
    let isAppointed = false;
    isAppointed = appointedDoctors?.filter(app=>{
      if (app.doctor.uuid===doctor.uuid) return app;
    });
    if (isAppointed.length>0) {
      isAppointed.sort(sortFunc);
      const state = isAppointed[0].state;
      console.log(`${state} ${doctor.uuid}`);
      setAppointmentState(state);
    }
  }
  }, [])

  const ActionButton = ({role})=>{

    let text = `Appointment Dr. ${doctor.user.fullName.split(' ')[0]}`;
    if (appointmentState &&( appointmentState==='rejected' || appointmentState==='closed')) appointmentState = false;
    if (appointmentState && appointmentState==='active') text = 'Active Appointment';
    else if (appointmentState) text = `Request ${appointmentState}`
    
     return (
      <>
      {role==='patient'&&<button disabled={appointmentState} onClick={handleClick} className={cls('text-[0.7rem]  bg-opacity-90 hover:bg-opacity-100 w-fit p-1 border-[1px] text-white rounded-md px-2', {'bg-primary' : !appointmentState}, {'bg-gray-700' : appointmentState==='pending'}, {'bg-green-600' : appointmentState==='active'})}>
                {text}
      </button>}  
      </>
    )
  
  }



  return (
    
    <div className="mt-3 px-24">
      {/* <div className='text-2xl'> <span className='font-medium'></span> Profile</div> */}
      <div className="bg-white w-full h-[250px] mt-9 rounded-xl flex items-center justify-between px-8 shadow-md">
        <div className="flex space-x-6 items-center">
          <div
            className="w-48 h-48 bg-black rounded-xl"
            style={{ background: `url(${doctor.user.img}) center center/cover` }}
          ></div>
          <div>
            <div className="text-xl font-semibold">{doctor.user.fullName}</div>
            <div className="text-xs text-gray-700">
              {doctor.medicalExperience}+ Years of Experience
            </div>
            <div className="mt-8 text-xs font-medium">👨‍⚕️Specialities : </div>
            <div className="mt-2 flex space-x-1">
              
             {doctor.specialities.map(s=>(
                  <Tag title={s.title} id={s.id}/>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
        {/* Contact */}
        <div className="flex space-x-1">
            <MdPhone size={20}/> <p className="text-sm">{doctor.user.contact}</p>
        </div>
        <div className="flex space-x-1">
            <MdEmail size={20} /> <p className="text-sm">{doctor.user.email}</p>
        </div>
        <div className="flex space-x-1">
            <MdHome size={20} /> <p className="text-sm">{doctor.address}</p>
        </div>
        <div className={user.role==='doctor'?'invisible':''}>
            <ActionButton role={user.role}/>
        </div>
        </div>
      </div>
      <div className="mt-7 w-full flex space-x-12">
          <div className="h-[350px] flex flex-col items-center w-24 rounded-tl-xl rounded-bl-xl bg-white">
              <div className="flex flex-col items-center justify-center bg-iconBg text-white w-full rounded-tl-xl p-3 border-b-2 hover:scale-110 transition-all cursor-pointer">
                   <MdPersonPin size={32} className="text-white"/>
                   <div>About</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-b-2 hover:scale-110 transition-all cursor-pointer">
                   <MdLocalMall size={32} className="text-primary"/>
                   <div>Store</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-b-2 hover:scale-110 transition-all cursor-pointer">
                   <MdFeed size={32} className="text-primary"/>
                   <div>Feed</div>
              </div>
              <div className="flex flex-col items-center justify-center p-3 hover:scale-110 transition-all cursor-pointer">
                   <MdReviews size={32} className="text-primary"/>
                   <div>Review</div>
              </div>
              
          </div>
          <div className="w-[910px] h-[350px] bg-white rounded-lg">
                <div className="p-5 group" id="About">
                    <div className="font-semibold text-xl">About</div>
                    <div className="h-1 w-5 transition-all group-hover:w-9 bg-primary"></div>
                    <div className="mt-5 overflow-y-scroll h-[270px] space-y-3">
                        <DetailCard title={"Name"} info={doctor.user.fullName} />
                        <DetailCard title={"Speciality"} info={<div className="mt-2 flex space-x-1">
                        {doctor.specialities.map(s=>(
                  <Tag title={s.title} id={s.id}/>
                ))}
            </div>} />
            <DetailCard title={"Medical University"} info={doctor.university} />
            <DetailCard title={"Degree"} info={doctor.degree} />
            <DetailCard title={"Address"} info={doctor.address} />
            <DetailCard title={"Contact"} info={doctor.user.contact} />

                        
                    </div>
                </div>
          </div>
      </div>

    </div>
  );
};

Profile.defaultProps = {
  profile: {
    name: "Keith Sebastian",
    image:
      "https://res.cloudinary.com/insight-byte/image/upload/v1643459644/unnamed_tqkmtj.jpg",
    speciality: "Heart Surgeon",
    experience: "2",
  },
};

export default Profile;
