import HttpRequest from "./axiosClient";

export const MediaService = {
  uploadImageAvatar: async (data: FormData) => {
    return HttpRequest.post("/s3media/upload", data);
  },
};
