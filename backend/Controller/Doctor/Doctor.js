const User = require("../../Model/Users");
const Record = require("../../Model/PaitientRecords");
const constants = require("../../config/constants.json");
const log4js = require("log4js");
const logger = log4js.getLogger("BasicNetwork");
const helper = require("../../app/helper");
const invoke = require("../../app/invoke");
const qscc = require("../../app/qscc");
const query = require("../../app/query");
const jwt = require("jsonwebtoken");
logger.level = "debug";
function getErrorMessage(field) {
  var response = {
    success: false,
    message: field + " field is missing or Invalid in the request",
  };
  return response;
}

exports.prescription = async (req, res, next) => {
  console.log("req.body: ", req.body);
  const {
    patientId,
    diagnosis,
    medicines,
    labTests,
    weight,
    height,
    temp,
    bp,
  } = req.body;
  let username;
  let orgName;
  let department;
  let name;

  const userdata = await User.findOne({ userId: req.session.uid });
  if (userdata) {
    username = userdata.userName;
    orgName = userdata.orgName;
    department = userdata.department;
    if (!userdata.access.includes(patientId)) {
      return res.status(400).json({
        success: false,
        message: `Doctor does not have the right to write a prescription for this user`,
      });
    }
  } else {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  let recordId;
  while (true) {
    recordId = Math.floor(10000 + Math.random() * 90000);
    const existingRecord = await Record.findOne({ recordId });
    if (!existingRecord) break;
  }

  const args = [
    recordId,
    patientId,
    req.session.uid,
    diagnosis,
    JSON.stringify(medicines),
    JSON.stringify(labTests),
    department,
    weight,
    height,
    temp,
    bp,
    username,
    new Date().toISOString(),
  ];

  try {
    const response = await invoke.invokeTransaction(
      "main-channel1",
      "chaincode1",
      "createPrescriptionRecord",
      args,
      username,
      orgName
    );

    console.log("ledger message: ", response);

    const newRecord = await Record.create({
      doctorId: req.session.uid,
      patientId,
      RecordId: recordId,
    });

    res
      .status(200)
      .json({ success: true, message: "Record Added Successfully", newRecord });
  } catch (error) {
    console.error("Error adding record:", error);
    res.status(500).json({ success: false, message: "Error adding record" });
  }
};

exports.getPrescription = async (req, res, next) => {
  const patientId = req.query.patientId;
  var username;

  const patientUsername = await User.findOne({ userId: patientId }).then(
    (result) => {
      console.log("patientId: ", patientId);
      console.log("result: ", result);

      username = result.userName;
    }
  );
  // logger.debug("req.body: ", req.body);

  // const args = req.body.args;
  // const transient = {};

  // // recordId PatientId DoctorId
  // args.unshift(req.session.uid);
  // args.unshift(req.body.patientId);
  // args.unshift(recordId);
  // // check user has access or not
  // logger.debug("args: ", args);

  // args.push(new Date().toISOString());
  var recordsData = [];

  const records = await Record.find({
    doctorId: req.session.uid,
    patientId,
  }).then(async (result) => {
    console.log("result: ", result);

    await Promise.all(
      Object.keys(result).map(async (item) => {
        let message = await query.query(
          "main-channel1",
          "chaincode1",
          [result[item].RecordId],
          "getPrescriptionRecord",
          username,
          "patient"
        );

        console.log("message: ", message);

        message.medicines = JSON.parse(JSON.parse(message.medicines));
        message.labTests = JSON.parse(JSON.parse(message.labTests));

        recordsData.push(message);
      })
    );
  });

  console.log("response");

  res.status(200).json({ success: true, recordsData });
};
