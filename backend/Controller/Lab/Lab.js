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

exports.labReports = async (req, res, next) => {
  const patientId = req.body.patientId;
  const recordId = req.body.recordId;
  const labReport = req.body.labReport;
  const labBill = req.body.labBill;
  const createdAt = new Date();
  const orgName = "lab";
  const transient = {};
  const args = [recordId, labReport, labBill, createdAt];

  var flag = 0;

  let username;
  const checkAccess = await User.findOne({ userId: req.session.uid }).then(
    (result) => {
      username = result.userName;
      console.log("result: ", result, "patientId: ", patientId);
      if (!result.access.includes(patientId)) {
        flag = 1;
        return res.status(400).json({
          success: false,
          message: `You do not have right to update the lab report for this user`,
        });
      }
    }
  );

  if (flag == 1) {
    return;
  }

  let message = await invoke.invokeTransaction(
    "main-channel1",
    "chaincode1",
    "addLabTestReport",
    args,
    username,
    orgName,
    transient
  );

  console.log(`message result is : ${message}`);

  res.status(200).json({
    success: true,
    message: "Lab Report updated successfully",
  });
};

exports.getLabReport = async (req, res, next) => {
  try {
    const patientId = req.query.patientId;
    console.log("patientId: ", patientId);

    // Check access rights
    const currentUser = await User.findOne({ userId: req.session.uid });

    // Get patient's username
    const patient = await User.findOne({ userId: patientId });
    if (!patient) {
      return res
        .status(400)
        .json({ success: false, message: "Patient not found" });
    }
    const username = patient.userName;

    // Fetch records
    const records = await Record.find({ patientId });
    if (!records || records.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No records found for this patient" });
    }

    // Fetch lab reports for each record
    const recordsData = await Promise.all(
      records.map(async (record) => {
        const message = await query.query(
          "main-channel1",
          "chaincode1",
          [record.RecordId],
          "getLabTestReport",
          username,
          "patient"
        );
        return message;
      })
    );

    res.json({ success: true, data: recordsData });
  } catch (error) {
    console.error("Error fetching lab report:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the lab report",
    });
  }
};
