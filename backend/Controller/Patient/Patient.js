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

exports.giveAccess = async (req, res, next) => {
  const { accessId } = req.body;
  console.log(accessId);
  console.log("uid: " + req.session.uid);
  console.log("role: " + req.session.role);
  if (req.session.role != "patient") {
    return res
      .status(200)
      .json({ success: false, message: "You dont have right to give access " });
  }
  var flag = 0;
  await User.findOne({ userId: req.session.uid }).then((result) => {
    if (result?.access?.includes(accessId)) {
      flag = 1;
      return res
        .status(200)
        .json({ success: false, message: "Already has access to your ID. " });
    }
  });

  if (flag == 1) {
    return;
  }
  await User.findOneAndUpdate(
    {
      userId: req.session.uid,
    },
    {
      $push: {
        access: accessId,
      },
    },
    {
      new: true,
    }
  );

  logger.debug("/give-access 1");

  await User.findOneAndUpdate(
    {
      userId: accessId,
    },
    {
      $push: {
        access: req.session.uid,
      },
    },
    {
      new: true,
    }
  )

    .then((result) => {
      logger.debug("/give-access 2");
      if (result) {
        res
          .status(200)
          .json({ success: true, message: "access given successfully" });
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
};

exports.removeAccess = async (req, res, next) => {
  const { accessId } = req.body;
  console.log(accessId);
  console.log("uid: " + req.session.uid);
  console.log("role: " + req.session.role);

  var flag = 0;
  await User.findOne({ userId: req.session.uid }).then((result) => {
    if (!result?.access?.includes(accessId)) {
      flag = 1;
      return res
        .status(200)
        .json({ success: false, message: "Access not given already " });
    }
  });

  if (flag == 1) {
    return;
  }
  await User.findOneAndUpdate(
    {
      userId: req.session.uid,
    },
    {
      $pull: {
        access: accessId,
      },
    },
    {
      new: true,
    }
  );

  logger.debug("/give-access 1");

  await User.findOneAndUpdate(
    {
      userId: accessId,
    },
    {
      $pull: {
        access: req.session.uid,
      },
    },
    {
      new: true,
    }
  )

    .then((result) => {
      logger.debug("/give-access 2");
      if (result) {
        res
          .status(200)
          .json({ success: true, message: "access removed successfully" });
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
};

exports.UserList = async (req, res, next) => {
  var username;
  const userData = await User.findOne({ userId: req.session.uid });
  // console.log(userData);
  username = userData.userName;
  access = userData.access;

  console.log("username: ", username);

  let fcn;
  let records = [];

  if (
    req.params.orgName == "doctor" ||
    req.params.orgName == "patient" ||
    req.params.orgName == "lab" ||
    req.params.orgName == "insurance" ||
    req.params.orgName == "pharmacy"
  ) {
    if (req.params.orgName == "doctor") {
      fcn = "getDoctor";
    } else if (req.params.orgName == "patient") {
      fcn = "getPatient";
    } else if (req.params.orgName == "lab") {
      fcn = "getLab";
    } else if (req.params.orgName == "insurance") {
      fcn = "getInsurance";
    } else if (req.params.orgName == "pharmacy") {
      fcn = "getPharmacy";
    }
    console.log("1");
    await User.find({ orgName: req.params.orgName }).then(async (usersList) => {
      console.log("2");
      await Promise.all(
        Object.keys(usersList).map(async (user, index) => {
          console.log("user ", index);
          console.log(
            usersList[index].userName,
            " : ",
            usersList[index].userId
          );
          console.log("3");
          let message = await query.query(
            "main-channel1",
            "chaincode1",
            [usersList[index].userId],
            fcn,
            username,
            "patient"
          );
          records.push(message);
        })
      );
      console.log("4");
    });
    console.log("5");
    return res.status(200).json({ success: true, records, access });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid Organization name" });
  }
};

exports.HealthRecords = async (req, res, next) => {
  var username;

  console.log("1");
  var patientId = req.session.uid;
  const getPatient = await User.findOne({ userId: patientId }).then(
    (result) => {
      console.log("result: ", result, "patientId: ", patientId);
      username = result.userName;
    }
  );
  console.log("2");
  var recordsData = [];

  const records = await Record.find({ patientId }).then(async (result) => {
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
        message.medicines = JSON.parse(JSON.parse(message.medicines));
        message.labTests = JSON.parse(JSON.parse(message.labTests));
        console.log(message.labTests);
        recordsData.push(message);
      })
    );
    console.log("4");
  });
  console.log("3");
  res.status(200).json({ success: true, recordsData });
};

exports.LabRecords = async (req, res, next) => {
  var username;
  const patientId = req.session.uid;
  const getPatient = await User.findOne({ userId: patientId }).then(
    (result) => {
      console.log("result: ", result, "patientId: ", patientId);
      username = result.userName;
    }
  );

  var recordsData = [];

  const records = await Record.find({ patientId }).then(async (result) => {
    await Promise.all(
      Object.keys(result).map(async (item) => {
        let message = await query.query(
          "main-channel1",
          "chaincode1",
          [result[item].RecordId],
          "getLabTestReport",
          username,
          "patient"
        );

        // Log the message to check its contents
        console.log("message before parsing: ", message);

        recordsData.push(message);
      })
    );
  });

  res.status(200).json({ success: true, recordsData });
};

exports.PharmacyRecords = async (req, res, next) => {
  try {
    const patientId = req.session.uid;

    // Fetch patient details
    const user = await User.findOne({ userId: patientId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const username = user.userName;
    console.log("result: ", user, "patientId: ", patientId);

    const recordsData = [];

    // Fetch records for the patient
    const records = await Record.find({ patientId });

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found for the patient",
      });
    }

    // Process each record
    await Promise.all(
      records.map(async (record) => {
        console.log("record: ", record);

        let message;
        try {
          message = await query.query(
            "main-channel1",
            "chaincode1",
            [record.RecordId],
            "getMedicineData",
            username,
            "patient"
          );
        } catch (error) {
          console.error("Error querying chaincode: ", error);
          return;
        }

        console.log("message record data: ", message);

        // Ensure message.medicines and message.medicineBill are valid JSON strings
        try {
          message.medicines = JSON.parse(message.medicines);
        } catch (error) {
          console.error("Error parsing medicines JSON: ", error);
          message.medicines = [];
        }

        try {
          message.medicineBill = JSON.parse(message.medicineBill);
        } catch (error) {
          console.error("Error parsing medicineBill JSON: ", error);
          message.medicineBill = {};
        }

        message.recordId = record.RecordId;
        message.doctorId = record.doctorId;
        message.username = record.username;

        recordsData.push(message);
      })
    );

    res.status(200).json({ success: true, recordsData });
  } catch (error) {
    console.error("Error occurred: ", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching pharmacy records",
      error: error.message,
    });
  }
};

exports.InsuranceRecords = async (req, res, next) => {
  var username;
  const patientId = req.session.uid;

  const getPatient = await User.findOne({ userId: patientId }).then(
    (result) => {
      console.log("result: ", result, "patientId: ", patientId);
      username = result.userName;
    }
  );

  var recordsData = [];

  const records = await Record.find({ patientId }).then(async (result) => {
    await Promise.all(
      Object.keys(result).map(async (item) => {
        let message = await query.query(
          "main-channel1",
          "chaincode1",
          [result[item].RecordId],
          "getClaimRequests",
          username,
          "patient"
        );
        //message.medicines = JSON.parse(JSON.parse(message.medicines));
        message.recordId = result[item].RecordId;
        recordsData.push(message);
      })
    );
  });

  res.status(200).json({ success: true, recordsData });
};
