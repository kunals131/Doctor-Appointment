import React, { useRef, useState } from 'react'
import Modal from '../Modal'
import Input from '../Input'
import { getLinkFile } from '../../utils/cloudinary';
import { createMedicalRecordAPI } from '../../api/patient';
const AddMedicalRecord = ({show, onClose, userId, setMedicalRecordsList}) => {
    const [file,setFile] = useState(null);
    const [title,setTitle] = useState('');
    const [remark,setRemark] = useState('');
    const [fileLink,setFileLink] = useState('');
    const [loading,setLoading]= useState(false);
    const ref = useRef();
    const handleFileChange = async(e)=>{
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            setFile(file);
            setLoading(true);
            try {
                const data = await getLinkFile(file);
                const {url} = data;
                console.log(url)
                setFileLink(url);
            }catch(err) {
                console.log(err);
            }
        }
        setLoading(false);
    }

    const handleSave = async ()=>{
        console.log('save');
        const res =await createMedicalRecordAPI({file : fileLink, patientId : userId,remark : remark, title});
        console.log(res.data);
        setMedicalRecordsList(prev=>[...prev, res.data]);
        onClose();
    }

  return (
    <Modal show={show} onClose={onClose} title={'Add Medical Record'} >
        <div className='mt-5 flex space-x-2 items-center'>
            <button onClick={()=>ref.current.click()} className='bg-[#5A5482] px-3 text-sm py-1 rounded-md text-white'>{loading?'Loading...':'Add File'}</button>
            <div className='text-sm text-gray-600*'>{file?file.name:'Add Medical Record'}</div>
            <input disabled={loading} ref={ref} type="file" onChange={handleFileChange} className='hidden' />
        </div>
        <Input placeholder="Title of Medical Record (Eg : Blood Report)"
        label="title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <Input placeholder="Remark"
        label="Remark"
        value={remark}
        name="remark"
        onChange={(e)=>setRemark(e.target.value)}
        />
        <button onClick={handleSave} disabled={loading} className='mt-5 text-sm border-[#5A5482] border-2 rounded-md text-[#5A5482] hover:bg-[#5A5482] hover:text-white transition-all px-2 py-1  w-fit'>{loading?'Loading...':'Save'}</button>

    </Modal>
  )
}

export default AddMedicalRecord