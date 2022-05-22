

import Image from 'next/image'


const InfoBox = ({ src, title, children, width,height, color, icon,onClick }) => {
    return (
      <div className="bg-white dark:bg-darkElevation-100 p-5 rounded-md" style={{ width }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div>
              <Image src={src} height={65} width={65}></Image>
            </div>
            <div>
              <div className="font-medium text-lg dark:text-gray-200">{title}</div>
              <div
                className="w-[40%] h-[3px] mt-1 bg-[#FF9074]"
                style={{ backgroundColor: color }}
              >
                {" "}
              </div>
            </div>
          </div>
          {icon&&<div onClick={onClick}>{icon}</div>}
        </div>
        <div className="mt-4 space-y-3 h-[150px] overflow-y-auto" style={{height}}>
          {children}
        </div>
      </div>
    );
  };


  export default InfoBox