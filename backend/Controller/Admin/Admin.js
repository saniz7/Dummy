const User = require("../../Model/Users");
const bcrypt = require("bcryptjs");
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

exports.register = async (req, res, next) => {
  const args = req.body.args;
  const username = req.body.username;
  const orgName = req.body.orgName;
  const password = req.body.password;
  const department = req.body.department;
  const transient = {};
  const fcn = req.body.fcn;

  // check admin status

  if (!username) {
    res.json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }

  // if (user1) {
  //     res.status(400).json({
  //         success: false,
  //         message: "User Already Exits"
  //     });
  //     return;
  // }

  const user1 = await User.findOne({ userName: username }).select("+password");
  if (user1) {
    res.status(400).json({
      success: false,
      message: "User Already Exits",
    });
    return;
  }

  while (true) {
    var userId = Math.floor(100000 + Math.random() * 900000);
    const us = await User.findOne({ userId }).select("+password");
    if (us) {
      continue;
    } else {
      break;
    }
  }

  // wallet
  let response = await helper.getRegisteredUser(username, orgName, true);

  args.unshift(userId);
  logger.debug("args: ", args);

  // ledger
  let message = await invoke.invokeTransaction(
    "main-channel1",
    "chaincode1",
    fcn,
    args,
    username,
    orgName,
    transient
  );

  console.log("ledger message: ", message);

  logger.debug(
    "-- returned from registering the username %s for organization %s",
    username,
    orgName
  );
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully registered the username %s for organization %s",
      username,
      orgName
    );
    const user = await User.create({
      userName: username,
      orgName,
      password,
      userId,
      department,
    });
    req.session.uid = user.userId;
    req.session.role = user.orgName;

    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    response.token = token;
    response.userName = user.userName;
    response.userId = user.userId;
    response.orgName = user.orgName;
    res.json(response);
  } else {
    logger.debug(
      "Failed to register the username %s for organization %s with::%s",
      username,
      orgName,
      response
    );
    res.json({ success: false, message: response });
  }
};

exports.registerPatient = async (req, res, next) => {
  const args = req.body.args || [];
  const username = req.body.username || "";
  const orgName = req.body.orgName || "patient";
  const password = req.body.password || "";
  const transient = req.body.transient || {};
  const fcn = req.body.fcn || "registerPatient";

  // check admin status
  if (!username) {
    res.json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }

  // if (user1) {
  //     res.status(400).json({
  //         success: false,
  //         message: "User Already Exits"
  //     });
  //     return;
  // }

  const user1 = await User.findOne({ userName: username }).select("+password");
  if (user1) {
    res.status(400).json({
      success: false,
      message: "User Already Exits",
    });
    return;
  }

  while (true) {
    var userId = Math.floor(100000 + Math.random() * 900000).toString();
    const us = await User.findOne({ userId }).select("+password");
    if (us) {
      continue;
    } else {
      break;
    }
  }

  // wallet
  let response = await helper.getRegisteredUser(username, orgName, true);

  args.unshift(username);
  args.unshift(userId);

  logger.debug("args: ", args);

  // ledger
  let message = await invoke.invokeTransaction(
    "main-channel1",
    "chaincode1",
    fcn,
    args,
    username,
    orgName,
    transient
  );

  console.log("ledger message: ", message);

  logger.debug(
    "-- returned from registering the username %s for organization %s",
    username,
    orgName
  );
  logger.debug("check", response);
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully registered the username %s for organization %s",
      username,
      orgName
    );
    const user = await User.create({
      userName: username,
      orgName,
      password,
      userId,
    });
    req.session.uid = user.userId;
    req.session.role = user.orgName;

    var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    response.token = token;
    response.userName = user.userName;
    response.userId = user.userId;
    response.orgName = user.orgName;
    res.json(response);
  } else {
    logger.debug(
      "Failed to register the username %s for organization %s with::%s",
      username,
      orgName,
      response
    );
    res.json({ success: false, message: response });
  }
};

exports.changePassword = async (req, res) => {
  const { userName, oldPassword, newPassword } = req.body;

  try {
    // Find the user by userName
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid old password" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updatePatient = async (req, res, next) => {
  const args = req.body.args || [];
  const username = req.body.username || "";
  const orgName = req.body.orgName || "patient";
  const transient = req.body.transient || {};
  const fcn = req.body.fcn || "updatePatient";

  // Input validation
  if (!username) {
    res.json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }
  if (args.length < 5) {
    res.status(400).json({
      success: false,
      message: "Missing arguments for updating patient",
    });
    return;
  }

  // Check if the user exists
  const user = await User.findOne({ userName: username }).select("+password");
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User does not exist",
    });
    return;
  }

  // Add userId to args
  args.unshift(user.userId);

  // wallet
  let response = await helper.getRegisteredUser(username, orgName, true);

  // ledger
  let message = await invoke.invokeTransaction(
    "main-channel1",
    "chaincode1",
    fcn,
    args,
    username,
    orgName,
    transient
  );

  console.log("ledger message: ", message);

  logger.debug(
    "-- returned from updating the patient %s for organization %s",
    username,
    orgName
  );
  logger.debug("check", response);
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully updated the patient %s for organization %s",
      username,
      orgName
    );
    res.json({
      success: true,
      message: `Successfully updated the patient with id ${user.userId}`,
      response,
    });
  } else {
    logger.debug(
      "Failed to update the patient %s for organization %s with::%s",
      username,
      orgName,
      response
    );
    res.json({ success: false, message: response });
  }
};

exports.Login = async (req, res, next) => {
  var username = req.body.username;
  var orgName = req.body.orgName;
  var password = req.body.password;
  logger.debug("End point : /users");
  logger.debug("User name : " + username);
  logger.debug("Org name  : " + orgName);

  if (!username) {
    res.json(getErrorMessage("'username'"));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage("'orgName'"));
    return;
  }

  let user = await User.findOne({ userName: username }).select("+password");
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid username ",
    });
  }
  console.log(orgName, user.orgName);
  if (user.orgName != orgName) {
    return res.status(400).json({
      success: false,
      message: "Username on this organization does not exits",
    });
  }
  if (orgName !== "Admin") {
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or Password",
      });
    }
  } else {
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid username or Password",
      });
    }
  }
  //     else (user.password !== password) {
  //  return res.status(400).json({
  //         success: false,
  //         message: "Invalid username or Password"
  //     });

  // }
  req.session.uid = user.userId;
  req.session.role = user.orgName;

  console.log(req.session.uid, req.session.role);

  var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  if (orgName == "Admin") {
    return res.status(200).json({
      success: true,
      token,
      userName: user.userName,
      orgName: user.orgName,
      userId: user.userId,
    });
  }
  let isUserRegistered = await helper.isUserRegistered(username, orgName);

  if (isUserRegistered) {
    res.status(200).json({
      success: true,
      token,
      userName: user.userName,
      orgName: user.orgName,
      userId: user.userId,
    });
  } else {
    res.status(400).json({
      success: false,
      message: `User with username ${username} is not registered with ${orgName}, Please register first.`,
    });
  }
};

exports.getUserDetails = async (req, res, next) => {
  console.log("started", req.session.uid);
  const userdata = await User.findOne({ userId: req.session.uid }).then(
    async (result) => {
      console.log("result: ", result);

      var accessMemberDetails = [];

      await Promise.all(
        result.access.map(async (item) => {
          console.log("item: ", item);

          const userDetails = await User.findOne({ userId: item }).then(
            async (accessResult) => {
              console.log("userDetails: ", accessResult);
              console.log("userDetailsName: ", accessResult.userName);

              // fetch query
              let fcn;
              if (accessResult.orgName == "doctor") {
                fcn = "getDoctor";
              } else if (accessResult.orgName == "patient") {
                fcn = "getPatient";
              } else if (accessResult.orgName == "lab") {
                fcn = "getLab";
              } else if (accessResult.orgName == "pharmacy") {
                fcn = "getPharmacy";
              } else if (accessResult.orgName == "insurance") {
                fcn = "getIncuranceCompany";
              }

              const userDataFromLedger = await query.query(
                "main-channel1",
                "chaincode1",
                [accessResult.userId],
                fcn,
                accessResult.userName,
                accessResult.orgName
              );
              accessMemberDetails.push(userDataFromLedger);
            }
          );
        })
      );

      res.status(200).json({
        success: true,
        result,
        accessMemberDetails,
        status: "success",
      });
    }
  );
};
exports.getUserDetailSelf = async (req, res, next) => {
  try {
    console.log("started", req.session.uid);

    // Fetch the user's own details
    const user = await User.findOne({ userId: req.session.uid });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    console.log("user: ", user);

    // Retrieve the registration arguments
    const registrationArgs = {
      userId: user.userId,
      userName: user.userName,
      orgName: user.orgName,
      gender: user.gender,
      contact: user.contact,
      // Add other fields here as per your User schema
    };

    // Determine the function to call based on the user's orgName
    let fcn;
    switch (user.orgName) {
      case "doctor":
        fcn = "getDoctor";
        break;
      case "patient":
        fcn = "getPatient";
        break;
      case "lab":
        fcn = "getLab";
        break;
      case "pharmacy":
        fcn = "getPharmacy";
        break;
      case "insurance":
        fcn = "getIncuranceCompany";
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid orgName" });
    }

    // Fetch data from the ledger
    const userDataFromLedger = await query.query(
      "main-channel1",
      "chaincode1",
      [user.userId],
      fcn,
      user.userName,
      user.orgName
    );

    // Return the user details along with registration arguments
    res.status(200).json({
      success: true,
      user,
      userDataFromLedger,
      registrationArgs,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching user details: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.getAllDoctors = async (req, res, next) => {
  try {
    console.log("Fetching all doctors");

    // Fetch all users with orgName 'doctor'
    const doctors = await User.find({ orgName: "doctor" });

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No doctors found" });
    }

    console.log("doctors: ", doctors);

    // Retrieve the registration arguments and ledger data for all doctors
    const doctorsData = await Promise.all(
      doctors.map(async (doctor) => {
        // Fetch data from the ledger for each doctor
        const doctorDataFromLedger = await query.query(
          "main-channel1",
          "chaincode1",
          [doctor.userId],
          "getDoctor",
          doctor.userName,
          doctor.orgName
        );

        return {
          user: doctor,
          doctorDataFromLedger,
          registrationArgs: {
            userId: doctor.userId,
            userName: doctor.userName,
            orgName: doctor.orgName,
            gender: doctor.gender,
            contact: doctor.contact,
            // Add other fields here as per your User schema
          },
        };
      })
    );

    res.status(200).json({
      success: true,
      doctors: doctorsData,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching doctors list: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.deleteDoctor = async (req, res, next) => {
  try {
    const doctorId = req.params.doctorId;

    // Check if the doctor exists in the database
    const doctor = await User.findOne({ userId: doctorId, orgName: "doctor" });

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Delete the doctor from the blockchain ledger
    await query.query(
      "main-channel1",
      "chaincode1",
      [doctorId],
      "deleteDoctor",
      doctor.userName,
      doctor.orgName
    );

    // Delete the doctor from the database
    await User.deleteOne({ userId: doctorId });

    res
      .status(200)
      .json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// Fetch all labs
exports.getAllLabs = async (req, res, next) => {
  try {
    console.log("Fetching all labs");

    // Fetch all users with orgName 'lab'
    const labs = await User.find({ orgName: "lab" });

    if (labs.length === 0) {
      return res.status(404).json({ success: false, message: "No labs found" });
    }

    console.log("labs: ", labs);

    // Retrieve the registration arguments and ledger data for all labs
    const labsData = await Promise.all(
      labs.map(async (lab) => {
        // Fetch data from the ledger for each lab
        const labDataFromLedger = await query.query(
          "main-channel1",
          "chaincode1",
          [lab.userId],
          "getLab",
          lab.userName,
          lab.orgName
        );

        return {
          user: lab,
          labDataFromLedger,
          registrationArgs: {
            userId: lab.userId,
            userName: lab.userName,
            orgName: lab.orgName,
            contact: lab.contact,
            // Add other fields here as per your User schema
          },
        };
      })
    );

    res.status(200).json({
      success: true,
      labs: labsData,
      status: "success",
    });
  } catch (error) {
    console.error("Error fetching labs list: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a lab
exports.deleteLab = async (req, res, next) => {
  try {
    const labId = req.params.labId;

    // Check if the lab exists in the database
    const lab = await User.findOne({ userId: labId, orgName: "lab" });

    if (!lab) {
      return res.status(404).json({ success: false, message: "Lab not found" });
    }

    // Delete the lab from the blockchain ledger
    await query.query(
      "main-channel1",
      "chaincode1",
      [labId],
      "deleteLab",
      lab.userName,
      lab.orgName
    );

    // Delete the lab from the database
    await User.deleteOne({ userId: labId });

    res
      .status(200)
      .json({ success: true, message: "Lab deleted successfully" });
  } catch (error) {
    console.error("Error deleting lab: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
