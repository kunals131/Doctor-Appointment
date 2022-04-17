const SocketConfig = (io)=>{
    // console.log(io.sockets.clients())



io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  console.log('SOMEONE JOINED '+id);

  socket.on('send-message', ({ recipients, text, time,author,authorName, authorImg }) => {
      console.log(recipients)
    recipients.forEach(recipient => {
      socket.broadcast.to(recipient).emit('receive-message', {
        sender: id, text,time,author, authorName, authorImg
      })
    })
  })
})


}


module.exports = SocketConfig;