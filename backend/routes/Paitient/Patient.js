const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../../middleware/auth");
const {
  giveAccess,
  removeAccess,
  UserList,
  HealthRecords,
  LabRecords,
  PharmacyRecords,
  InsuranceRecords,
} = require("../../Controller/Patient/Patient");
const { updatePatient } = require("../../Controller/Admin/Admin");

const router = express.Router();
router.route("/update-patient").patch(updatePatient);

router
  .route("/give-access")
  .post(isAuthenticatedUser, authorizeRoles("patient"), giveAccess);
router
  .route("/remove-access")
  .post(isAuthenticatedUser, authorizeRoles("patient"), removeAccess);
// router.route('/department').get(isAuthenticatedUser,authorizeRoles("patient"), department);
router
  .route("/user-list/:orgName")
  .get(isAuthenticatedUser, authorizeRoles("patient"), UserList);
router
  .route("/patient-health-records")
  .get(isAuthenticatedUser, authorizeRoles("patient"), HealthRecords);
router.route("/patient-lab-records").get(isAuthenticatedUser, LabRecords);
router
  .route("/patient-pharmacy-records")
  .get(isAuthenticatedUser, authorizeRoles("patient"), PharmacyRecords);
router
  .route("/patient-insurance-records")
  .get(isAuthenticatedUser, authorizeRoles("patient"), InsuranceRecords);
// router.route('/health-records').get(isAuthenticatedUser, authorizeRoles("patient"), );

module.exports = router;
