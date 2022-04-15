const {Schedule} = require('../../models')

const getScheduleHandler = async (req,res)=>{
    const id = req.params.id;
    try {
        const schedule = await Schedule.findOne({
            where : {id}
        });
        if (!schedule) return res.status(404).json({message : 'Schedule not found with that id'})
        res.json(schedule);
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }
}

module.exports = {getScheduleHandler};