import HttpRequest from "./axiosClient";

export const MessageService = {
  getByConversationId: async (
    conversationId: string,
    skip = 0,
    limit = 20,
    send_time = 0
  ) => {
    return HttpRequest.get(
      `/message/by_conversation_id/${conversationId}/?skip=${skip}&limit=${limit}&send_time=${send_time}`
    );
  },
  deleteMessage: async (id: string, members: Array<string>) => {
    return HttpRequest.post(`/message/delete/${id}`, {
      conversation_members: members,
    });
  },

  searchByContent: async (conversationId: string, searchKey: string) => {
    return HttpRequest.get(
      `/message/search?conversation_id=${conversationId}&searchKey=${searchKey}`
    );
  },
};
