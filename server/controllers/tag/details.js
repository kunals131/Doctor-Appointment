const {Tag} = require('../../models');
const Sequelize = require('sequelize')
const getAllTagsHandler = async(req,res)=>{
    try {
        const result  = await Tag.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('title')) ,'title'],
            ]
        });
        res.json(result.map((tag)=>tag.title));
    }catch(err) {
        console.log(err);
        return res.status(400).json({message : 'Something went wrong!', error : err});
    }

}

module.exports = {getAllTagsHandler}