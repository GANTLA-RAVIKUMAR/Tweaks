import { Dispatch } from 'react';

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  avatar: string;
  statusText: string;
}

export interface MyInfo {
  id: string;
  name: string;
  mobile: string;
  email: string;
  avatar: string;
  statusText: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  statusText: string;
  onlineStatus: 'online' | 'offline';
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  senderId: string; // 'me' or contact's id
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  unreadCount: number;
}

export interface Status {
  id: string;
  contactId: string;
  imageUrl: string;
  timestamp: string;
  viewed: boolean;
}

export enum CallType {
  AUDIO = 'audio',
  VIDEO = 'video',
}

export interface Call {
  id: string;
  contactId: string;
  type: CallType;
  direction: 'incoming' | 'outgoing' | 'missed';
  timestamp: string;
}

// --- State Management ---
export interface AppState {
  isAuthenticated: boolean;
  myInfo: MyInfo | null;
  users: User[]; // Simulated user database
  contacts: Contact[];
  chats: Chat[];
  incognitoChats: Chat[];
  statuses: Status[];
  calls: Call[];
}

export type Action =
  | { type: 'SIGNUP'; payload: { name: string; mobile: string; email: string } }
  | { type: 'LOGIN'; payload: { mobile: string; } }
  | { type: 'LOGOUT' }
  | { type: 'SEND_MESSAGE'; payload: { chatId: string; message: Message; isIncognito: boolean } }
  | { type: 'START_CHAT'; payload: { contactId: string; id: string } }
  | { type: 'START_INCOGNITO_CHAT'; payload: { contactId: string; id: string } }
  | { type: 'UPDATE_PROFILE'; payload: { name: string; statusText: string } }
  | { type: 'ADD_STATUS'; payload: { imageUrl: string; timestamp: string } };

export interface AppContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
}
