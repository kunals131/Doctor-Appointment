const { Appointment, Schedule, Doctor, Patient } = require("../../models");
const { ifAppointmentExists } = require("../../utils/ifExists");

const getAppointmentHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findOne({
      where: { id },
      include: [
        "schedules",

        {
          model: Doctor,
          as: "doctor",
          include: ["user"],
        },
        {
          model: Patient,
          as: "patient",
          include: ["user", "symptoms", "diagnoses", "medicalRecords", "payments", "medications", "symptoms"],
        },
      ],
    });
    if (!appointment)
      return res.status(404).json({ message: "No appointment found." });
    res.json(appointment);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong", error: err });
  }
};

const getAppointmentSchedulesHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const ifExists = await ifAppointmentExists(id);
    if (!ifExists)
      return res.status(404).json({ message: "Appointment not found!" });
    const schedules = await Schedule.findAll({
      where: { appointmentId: id },
      order: [["createdAt", "DESC"]],
    });
    res.json(schedules);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something went wrong", error: err });
  }
};

module.exports = { getAppointmentHandler, getAppointmentSchedulesHandler };
