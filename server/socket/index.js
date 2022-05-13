const {Message} = require('../models')

const createMessage = async(from,to,type,text, appointmentId)=>{
  const message =await Message.create({
    from, to,type,text,appointmentId
  })
  console.log(message);
}

const SocketConfig = (io)=>{
    // console.log(io.sockets.clients())



io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  console.log('SOMEONE JOINED '+id);

  socket.on('send-message', ({ recipients,type,appointmentId,text,createdAt, from}) => {
    createMessage(from.uuid,recipients[0], type,text,appointmentId);

    recipients.forEach(recipient => {
      socket.broadcast.to(recipient).emit('receive-message', {    
        sender: id,type,appointmentId,text, from, createdAt
      })
    })
  })
})


}


module.exports = SocketConfig;