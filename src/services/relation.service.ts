import HttpRequest from "./axiosClient";

export const RelationServives = {
  getAllRelation: async () => HttpRequest.get("/friend/get_all_friend"),
  getAllRequestReceived: async () =>
    HttpRequest.get("/friend/get_all_request_recived"),
  getAllRequestSending: async () =>
    HttpRequest.get("/friend/get_all_request_sended"),
  sendRelation: async (data: any) =>
    HttpRequest.post("/friend/send_request", data),
  getAllSuggest: async () => HttpRequest.get("/friend/get_all_suggested"),
  acceptRelation: async (data: any) =>
    HttpRequest.post("/friend/accept_request", data),
};
