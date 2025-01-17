import httpService from "./httpService";
const apiEndpoint = "/password";

async function forgotPassword(email) {
  const emailDetails = { email: email };
  return httpService.post(apiEndpoint + "/forgot", emailDetails);
}

async function resetPassword(password, token) {
  const data = {
    password: password,
  };
  return httpService.put(apiEndpoint + `/reset/${token}`, data);
}

async function updatePassword(oldPassword, newPassword, userName) {
  const pass = { oldPassword, newPassword, userName };
  return httpService.put("changepassword", pass);
}

const passwordService = { forgotPassword, resetPassword, updatePassword };

export default passwordService;
