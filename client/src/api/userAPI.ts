import { getAPI } from "../axios";

export const fetchUserData = async () => {
  const response = await getAPI("/api/users");
  return response.data;
};
