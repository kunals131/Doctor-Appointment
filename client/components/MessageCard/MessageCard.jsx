import React from 'react';

const MessageCard = ({image,name,message}) => {
  return (
      <div className="w-full bg-mainBackground transition-all hover:bg-headingBackground cursor-pointer group rounded-xl flex p-2 space-x-5">
          <div className='group-hover:border-2 transition-all group-hover:border-primary w-12 h-12 rounded-full' style={{background : `url(${image}) center center/cover`}}></div>
          <div>
              <div className='text-sm font-semibold text-gray-900'>{name}</div>
              <div className='text-[0.8rem]'>{message}</div>
          </div>
      </div>
  );
};


MessageCard.defaultProps = {
    image : 'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg',
    name : 'Kunal Sangtiani',
    message : 'Hello I am ill and I think I will die...'
}

export default MessageCard;
