import axios from "../utils/customixeAxios";
const apiAddUser = async (email, password, name, role, img) => {
  const formData = new FormData();
  formData.append("userImage", img);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("username", name);
  formData.append("role", role);
  return await axios.post("participant", formData);
};
export { apiAddUser };
