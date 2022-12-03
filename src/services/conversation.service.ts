import HttpRequest from "./axiosClient";

export const ConversationService = {
  getAllConversations: async () =>
    HttpRequest.get("/conversation/all_conversations"),
  pinMessage: async (message: any) =>
    HttpRequest.post("/conversation/pin_message", message),
  unPinMessage: async (message: any) =>
    HttpRequest.post("/conversation/un_pin_message", message),
  deleteConversation: async (data: { conversation_id: string }) =>
    HttpRequest.post("/conversation/member_delete", data),
  addMember: async (data: {
    conversation_id: string;
    userIds: Array<string>;
  }) => HttpRequest.post("/conversation/add_member", data),
  removeMember: async (data: { conversation_id: string; userId: string }) =>
    HttpRequest.post("/conversation/remove_member", data),
  getInfoConversation: async (conversationId: string) =>
    HttpRequest.get(`/conversation/${conversationId}`),
};
