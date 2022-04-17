import React, { useState } from "react";
import { MdPhone, MdEmail, MdHome, MdPersonPin, MdLocalMall, MdFeed, MdReviews } from "react-icons/md";
import DoctorProfile from "../../components/DoctorCard";

const DetailCard = ({title,info})=>(
    <div className="bg-mainBackground w-full h-auto p-2 rounded-lg">
        <div className="text-sm font-semibold text-gray-600">{title} : </div>
        <div className="mt-1">{info}</div>
    </div>
)

const Profile = ({ profile }) => {
  

  return (
    
    <div className="mt-3 px-24">
      {/* <div className='text-2xl'> <span className='font-medium'></span> Profile</div> */}
      <div className="bg-white w-full h-[250px] mt-9 rounded-xl flex items-center justify-between px-8 shadow-md">
        <div className="flex space-x-6 items-center">
          <div
            className="w-48 h-48 bg-black rounded-xl"
            style={{ background: `url(${profile.image}) center center/cover` }}
          ></div>
          <div>
            <div className="text-xl font-semibold">{profile.name}</div>
            <div className="text-xs text-gray-700">
              {profile.experience}+ Years of Experience
            </div>
            <div className="mt-8 text-xs font-medium">👨‍⚕️Specialities : </div>
            <div className="mt-2 flex space-x-1">
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Dentist
              </span>
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Heart
              </span>
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Joint Pain
              </span>
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Lungs
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
        {/* Contact */}
        <div className="flex space-x-1">
            <MdPhone size={20}/> <p className="text-sm">+91 7049930903</p>
        </div>
        <div className="flex space-x-1">
            <MdEmail size={20} /> <p className="text-sm">keithsebas@gmail.com</p>
        </div>
        <div className="flex space-x-1">
            <MdHome size={20} /> <p className="text-sm">Hoit Clinic - new Neightbour</p>
        </div>
        <div>
            <button className="text-sm mt-2 bg-primary text-white rounded-xl px-3 py-2" >👨‍⚕️ Appoint Doctor Keith</button>
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
                        <DetailCard title={"Name"} info={profile.name} />
                        <DetailCard title={"Speciality"} info={<div className="mt-2 flex space-x-1">
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Dentist
              </span>
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Heart
              </span>
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Joint Pain
              </span>
              <span className="text-[0.8rem] px-2 py-1 bg-gray-300 rounded-lg">
                Lungs
              </span>
            </div>} />
            <DetailCard title={"Medical University"} info={"Institute of Medical Science, UK"} />
            <DetailCard title={"Degree"} info={"MBBS | Dentistry"} />
            <DetailCard title={"Address"} info={"Keith Street Norway"} />
            <DetailCard title={"Contact"} info={"+91 7049930"} />

                        
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
