import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllUserDetailsAPI, getUserMessagesAPI } from '../api/common';
import { getDoctorAppointmentsAPI, getDoctorStatsAPI } from '../api/doctor';
import DoctorDashboard from '../components/Dashboard/Doctor';
import PatientDashboard from '../components/Dashboard/Patient';
import { updateUser } from '../redux/actions/user';
import { verifyAuthentication } from '../utils/verifyAuth';

export const getServerSideProps = async(ctx) => {
    let auth = verifyAuthentication(ctx.req);
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
    if (auth.decodedData.role==='patient') {
      return {
        redirect : {
          destination : '/patientboard'
        }
      }
    }
    let error = null;
    try {
     const stats =  await getDoctorStatsAPI(auth.decodedData.dataId);
     const appointments = await getDoctorAppointmentsAPI(auth.decodedData.dataId);
     const messages = await getUserMessagesAPI(auth.decodedData.uuid);
     return {
      props: {user : auth.decodedData, stats : stats.data, appointments : appointments.data, messages : messages.data},
    };
    }catch(err) {
      console.log(err);
      error = err;  
      return {
        props: {user : auth.decodedData, error},
      };
    }
  
  };
  
const Dashboard = ({user, error,stats, appointments, messages}) => {
  const dispatch=  useDispatch();
  useEffect(()=>{
    dispatch(updateUser(user));
  }, [])
  // console.log(user)
  console.log(appointments);
  if (error) {
    return <div>Error Occured</div>
  }
  return (
    <>
    {user.role==='doctor'?<DoctorDashboard stats={stats} messages={messages} appointments={appointments}/>:<PatientDashboard/>}
    </>
  )
}

export default Dashboard