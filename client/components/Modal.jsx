import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {MdClear} from 'react-icons/md';



const Modal = ({ show, onClose, children, title, width }) => {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    useEffect(()=>{
      if (show) {
        window.scrollTo({top : 0, left : 0, behavior : 'smooth'});
        document.body.style.overflow = 'hidden';
      }
      else {
        document.body.style.overflow = 'unset'
      }
    }, [show])
  
    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
    };
  
    const modalContent = show ? (
        <div className="w-screen h-screen left-0 absolute top-0 flex justify-center items-center bg-black bg-opacity-60">
            <div className="bg-white dark:bg-darkElevation-100 dark:rounded-md w-[42%] h-auto p-4 rounded-sm">
                <div className="w-full flex items-center justify-between">
                    <div>{title}</div>
                    <div onClick={handleCloseClick} className="p-1 hover:bg-primary rounded-full hover:text-white transition-all"><MdClear size={20}/></div>
                </div>
                <hr className="my-2 dark:border-darkElevation-900"/>
                <div className="mt-2">
                    {children}
                </div>
            </div>
        </div>
    ) : null;
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
      );
    } else {
      return null;
    }
  };
  
  
  
  export default Modal;