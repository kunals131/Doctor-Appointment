import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllUserDetailsAPI } from '../api/common';
import { getDoctorAppointmentsAPI, getDoctorStatsAPI } from '../api/doctor';
import { allPatientDetailsAPI, getAllAppointedDoctors } from '../api/patient';
import DoctorDashboard from '../components/Dashboard/Doctor';
import PatientDashboard from '../components/Dashboard/Patient';
import { updateUser } from '../redux/actions/user';
import { verifyAuthentication } from '../utils/verifyAuth';

export const getServerSideProps = async(ctx) => {
    const auth = verifyAuthentication(ctx.req);
    if (!auth.state) {
      return {
        redirect : {
          destination : '/',
          permanent : false
        }
      }
    }
    const userData = await getAllUserDetailsAPI(auth.decodedData.uuid);
    auth.decodedData = userData.data;
    
   if (auth.decodedData.role==='doctor') {return {redirect : {destination : '/dashboard', permanent : false}}}
   try {
       const patientDetails = await allPatientDetailsAPI(auth.decodedData.dataId);
       const appointedDoctors = await getAllAppointedDoctors(auth.decodedData.dataId);
       return {props : {user : auth.decodedData, patient : patientDetails.data, appointedDoctors : appointedDoctors.data}}
   }catch(err) {
       console.log(err);
       return {
           notFound : true
       }
   }
  };
  
const Dashboard = ({error, patient,user, appointedDoctors}) => {
    // console.log(patient);
    // console.log(user);
    // console.log(appointedDoctors);
  const dispatch=  useDispatch();
  useEffect(()=>{
    dispatch(updateUser(user));
  }, [])
 
  if (error) {
    return <div>Error Occured</div>
  }
  return (
    <>
    <PatientDashboard patient={patient} user={user} appointedDoctors={appointedDoctors}/>
    </>
  )
}

export default Dashboard