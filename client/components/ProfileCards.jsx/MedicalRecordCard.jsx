const MedicalRecordCard = ({record})=>{
    return (
      <div className="p-2 bg-green-50 dark:bg-darkElevation-400 rounded-md hover:bg-green-200 transition-all cursor-pointer">
        <a href={record.file} className="text-sm block  font-semibold">{record.title}</a>
        <div className="text-[0.65rem] mt-1">{record.remark}</div>
      </div>
    )
  }
export default MedicalRecordCard;