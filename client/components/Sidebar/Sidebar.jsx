import React from "react";

import { FaFire, FaPoo } from "react-icons/fa";
import {
  MdHome,
  MdStackedBarChart,
  MdQuestionAnswer,
  MdAccessAlarms,
  MdStorefront,
  MdLogout,
} from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { FaRobot } from "react-icons/fa";

const SideBarIcon = ({ icon, text = "tooltip 💡", link }) => {
  return (
    <div className="sidebar-icon group">
      {icon}
      <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="fixed top-0 rounded-tr-2xl rounded-br-2xl scale-0 sm:scale-100 left-0 h-screen w-24 m-0 flex flex-col pt-36 bg-primary text-white shadow-lg">
      <SideBarIcon
        link="/dashboard"
        icon={<MdHome size="28" />}
        text="Dashboard🏥"
      />
      <SideBarIcon
        link="/doctors"
        icon={<MdSearch size="27" />}
        text="Search 🔎"
      />
      <SideBarIcon icon={<FaRobot size="23" />} text="AI Diagnosis 🤖" />
      <SideBarIcon icon={<MdAccessAlarms size="26" />} text="Appointments🕛" />
      <SideBarIcon icon={<MdStorefront size="26" />} text="Store💊" />
      <div className="logout-icon group">
        <MdLogout></MdLogout>
        <span className="sidebar-tooltip group-hover:scale-100">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
