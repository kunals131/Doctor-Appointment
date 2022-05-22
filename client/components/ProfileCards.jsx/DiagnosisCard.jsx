import {AiFillRobot} from 'react-icons/ai';
import {useRouter} from 'next/router';

const DiagnosisCard = ({diagnosis})=>{
    const router = useRouter();
    return (
      <div onClick={()=>router.push(`/diagnosis/${diagnosis.id}`)} className="p-2 bg-pink-100 dark:bg-darkElevation-400 cursor-pointer flex hover:bg-pink-50 justify-between items-center text-sm rounded-md">
        <div className="flex space-x-5 items-center">
          <div className="p-2 rounded-md bg-pink-400"><AiFillRobot className="text-white"/></div>
          <div>New Diagnosis</div>
        </div>
        <div>😷Fermi</div>
     
      </div>
    )
  }

export default DiagnosisCard;