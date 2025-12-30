export const useAuthApi = () => {
  const login = async (values) => {
    const { data } = await axiosClient.post("/Users/Login", values);
    return data;
  };
  return {
    login,
  };
};
