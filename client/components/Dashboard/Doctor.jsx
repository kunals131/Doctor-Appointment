import React, { useState } from "react";
import DashboardCount from "../DashBoardCount/DashboardCount";
import { MdOutlineMoreHoriz } from "react-icons/md";
import AppointmentCard from "../AppointmentCard/AppointmentCard";
import {
  MdCalendarToday,
  MdVisibility,
  MdAccountBalanceWallet,
  MdPeopleOutline,
} from "react-icons/md";

const ComponentHeading = ({ text }) => (
  <div className="w-full rounded-t-xl flex justify-between items-center bg-headingBackground h-12 px-4">
    <div className="font-medium text-gray-700">{text}</div>
    <div className="text-gray-600 hover:scale-110 cursor-pointer">
      <MdOutlineMoreHoriz size={23} />
    </div>
  </div>
);

const DoctorDashboard = ({stats, appointments}) => {
  const [dashboardState, setDashboardState] = useState('Doctor');
  return (
    <div className="mt-14">
      
      <div className="grid grid-cols-4 grid-flow-col  space-x-3">
        <DashboardCount
          icon={<MdCalendarToday size={36} />}
          count={stats.totalPatients}
          text="3 today!✅"
          title="Appointments"
        ></DashboardCount>
        <DashboardCount
          icon={<MdVisibility size={39} />}
          count={stats.profileViews}
          text="43% Higher⚡"
          title="Profile Views"
        ></DashboardCount>
        <DashboardCount
          icon={<MdAccountBalanceWallet size={38} />}
          count={stats.totalRevenue}
          text="430$+ This week"
          title="Total Revenue"
        ></DashboardCount>
        <DashboardCount
          icon={<MdPeopleOutline size={40} />}
          count={stats.totalPatients}
          text="7 Active"
          title="Total Patients"
        ></DashboardCount>
      </div>
      <div className="flex mt-9 space-x-7">
        <div className="bg-white w-[570px] rounded-xl h-[410px]">
          <ComponentHeading text="Active Appointments" />
          <div className="mt-3 p-3 flex flex-col space-y-3">
            {appointments?.length&&appointments.map((appointment)=><AppointmentCard/>)}
            {!appointments?.length&&<div className="">No Appointments yet</div>}
          </div>
        </div>
        
        <div className="bg-white h-[410px] rounded-xl w-[330px]">
          <ComponentHeading text="Messages" />
          <div className="mt-3 p-3 flex flex-col space-y-3">
            {/* <MessageCard></MessageCard> */}
          </div>
        </div>
        <div className="bg-white h-[410px] rounded-xl w-[300px]">
          <ComponentHeading text="Notification" />
          <div className="flex text-center h-4/5 w-4/5 m-auto justify-center items-center">
            <div className="text-sm text-gray-800">This Feature is not currently under development</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
