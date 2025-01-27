import axios from "axios";

const CustomAxios = axios.create({
  // baseURL: "https://artifact-hub-server.vercel.app",
  baseURL: "http://localhost:3000",
});
const useCustomAxios = () => {
  return CustomAxios;
};

export default useCustomAxios;
