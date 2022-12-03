import HttpRequest from "./axiosClient";

export const ContactService = {
  getAllUserOfSymtem: async () => {
    return HttpRequest.get("/user/get_all");
  },
};
