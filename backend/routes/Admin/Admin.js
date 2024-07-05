const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/auth");
const {
  Login,
  registerPatient,
  updatePatient,
  changePassword,
  register,
  getUserDetails,
  getUserDetailSelf,
  getAllDoctors,
  deleteDoctor,
  getAllLabs,
  deleteLab,
  getAllLabRecords,
} = require("../../Controller/Admin/Admin");
const { getLabReport } = require("../../Controller/Lab/Lab");

const router = express.Router();

router
  .route("/register")
  .post(isAuthenticatedUser, authorizeRoles("Admin"), register);
// router.route('/register').post(register);
router.route("/register-patient").post(registerPatient);
// router.route("/update-patient").post(updatePatient);
router.route("/users/login").post(Login);
router.route("/changepassword").put(changePassword);

router.route("/get-user-detail").get(isAuthenticatedUser, getUserDetails);
router.route("/get-user-detail-self").get(getUserDetailSelf);
router.route("/doctorlist").get(getAllDoctors);
router.route("/lablist").get(getAllLabs);
router.route("/labrecords").get(getLabReport);
router.route("/doctor/:doctorId").delete(deleteDoctor);
router.route("/lab/:labId").delete(deleteLab);

module.exports = router;
