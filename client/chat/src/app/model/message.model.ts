export interface Message {
  conversationId: string;
  created: Date;
  from: string;
  inChatRoom: boolean;
  mine?: boolean;
  text: string;
}
