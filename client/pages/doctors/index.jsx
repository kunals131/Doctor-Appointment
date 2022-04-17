import React from "react";
import FilterOptions from "../../components/FilterOptions";
import Image from "next/image";
import { MdHome, MdPhone } from "react-icons/md";


const Doctors = () => {
  return (
    <div className="flex space-x-10 mt-10">
      <div className="w-fit">
        <FilterOptions />
      </div>
      <div className=" w-[55vw] rounded-md">
        <div className="bg-white w-full p-5 rounded-md py-5">
          <input
            type="text"
            placeholder="Search for any keyword"
            className="border w-full py-3 p-2 text-sm"
          />
        </div>
        <div className="mt-3 bg-white rounded-md p-4">
          <div className="font-medium text-xl">Doctors Found</div>
          <div className="text-xs mt-1 text-gray-500 font-medium">
            44 Results Found
          </div>
          <hr className="my-3" />
          <div className="grid mt-6 grid-cols-1 gap-5 p-2">
            <DoctorProfile />
            <DoctorProfile />
            <DoctorProfile />
            <DoctorProfile />
            <DoctorProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
