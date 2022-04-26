const { Doctor, Appointment, Speciality } = require("../../models");
const { ifDoctorExists } = require("../../utils/ifExists");

const addSpecialityHandler = async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  try {
    if (!title)
      return res.status(400).json({ message: "Some fields are missing" });
    const isExists = await ifDoctorExists(id);
    if (!isExists) return res.status(404).json({ message: "Doctor Not Found!" });
    const newSpeciality = await Speciality.create({
      title,
      doctorId: id,
    });
    return res.json(newSpeciality);
  } 
  catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: err });
  }
};
const removeSpecialityHandler = async (req, res) => {

  const { specialityId,id } = req.params;

  try {
    if (!specialityId) return res.status(400).json({ message: "Some fields are missing" });
    const isExists = await ifDoctorExists(id);
    if (!isExists) return res.status(404).json({ message: "Doctor Not Found!" });
    await Speciality.destroy({
        where : {id : specialityId}
    })

    return res.json({message : 'Delete Successfully!'});
  } 
  catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: err });
  }
};



// const addTagHandler = async(req,res)=>{
//     const id = req.params.id;
//     const {title} = req.body;
//     if (!title) return res.status(400).json({ message: "Some fields are missing" });
//     try {
//         const isExists = await ifDoctorExists(id);
//         if (!isExists) return res.status(404).json({ message: "Doctor Not Found!" });
//         const newTag = await Tag.create({title, doctorId : id});
//         res.json(newTag);
//     }catch(err) {
//         console.log(err);
//         return res
//           .status(400)
//           .json({ message: "Something went wrong!", error: err });
//     }
// }

// const removeTagHandler = async(req,res)=>{

//     const {tagId,id} = req.params;
//     if (!tagId) return res.status(400).json({ message: "Some fields are missing" });
//     try {
//         const isExists = await ifDoctorExists(id);
//         if (!isExists) return res.status(404).json({ message: "Doctor Not Found!" });
//         await Tag.destroy({
//             where : {id : tagId}
//         });
//         res.json({message : 'Tag removed'})
//     }catch(err) {
//         console.log(err);
//         return res
//         .status(400)
//         .json({ message: "Something went wrong!", error: err });
//     }
// }

const updateDoctorHandler = async(req,res)=>{
    const id = req.params.id;
    const {university,degree,address} = req.body;
    try {
    let isUpdated = false;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return res.status(404).json({ message: "Doctor Not Found!" });

    if (university) {
        isUpdated = true;
        doctor.university = university;
    }
    if (degree) {
        isUpdated = true,
        doctor.degree = degree;
    }
    if (address) {
        isUpdated = true;
        doctor.address = address;
    }
    if (isUpdated) {
        const result = await doctor.save();
        return res.json(result);
    }


    return res.json({message : 'Nothing Changed'});


}  catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ message: "Something went wrong!", error: err });
  }

}


module.exports = {addSpecialityHandler, updateDoctorHandler, removeSpecialityHandler}
