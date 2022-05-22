const {Doctor} = require('../../models');
const stringComparison = require('string-comparison');
const {cosine} = stringComparison;

const getDoctorsBasedOnKeywordsHandler = async(req,res)=>{
    let {keywords, accuracy} =req.query;
    if (!keywords) keywords=" ";
    if (!accuracy) accuracy = 0.0;
    const allDoctors = await Doctor.findAll({
        include : ['user', 'specialities']
    });
    const TagList = allDoctors.map((doc)=>{
        let tags = [doc.tags,doc.user.fullName, ...doc.specialities, doc.university||'', doc.degree||'', doc.address||'', doc.user.contact,doc.uuid, doc.user.contact];
        const tagString = tags.join(',');
        return tagString;
    })
    
    let sortedList = cosine.sortMatch(keywords, TagList).reverse();
    sortedList = sortedList.filter(fil=>fil.rating>=accuracy)
    const doctorsFiltered = sortedList.map((item)=>allDoctors[item.index])  ;
    return res.json({doctorsFiltered});

}

module.exports = {getDoctorsBasedOnKeywordsHandler};