import { AppState, CallType } from './types';

const MOCK_USERS = [
  { id: '1', name: 'Priya Nair', mobile: '1111111111', email: 'priya@email.com', avatar: 'https://i.pravatar.cc/150?img=8', statusText: "Life is beautiful!" },
  { id: '2', name: 'Rahul Mehta', mobile: '2222222222', email: 'rahul@email.com', avatar: 'https://i.pravatar.cc/150?img=12', statusText: "Work hard, play hard." },
  { id: '3', name: 'Anjali Gupta', mobile: '3333333333', email: 'anjali@email.com', avatar: 'https://i.pravatar.cc/150?img=22', statusText: "Dreamer ✨" },
  { id: '4', name: 'Karan Patel', mobile: '4444444444', email: 'karan@email.com', avatar: 'https://i.pravatar.cc/150?img=45', statusText: "Exploring the world." },
];

export const initialState: AppState = {
  isAuthenticated: false,
  myInfo: null,
  users: MOCK_USERS,
  contacts: [
    { id: '1', name: 'Priya Nair', avatar: 'https://i.pravatar.cc/150?img=8', statusText: "Life is beautiful!", onlineStatus: 'online' },
    { id: '2', name: 'Rahul Mehta', avatar: 'https://i.pravatar.cc/150?img=12', statusText: "Work hard, play hard.", onlineStatus: 'online' },
    { id: '3', name: 'Anjali Gupta', avatar: 'https://i.pravatar.cc/150?img=22', statusText: "Dreamer ✨", onlineStatus: 'offline' },
    { id: '4', name: 'Karan Patel', avatar: 'https://i.pravatar.cc/150?img=45', statusText: "Exploring the world.", onlineStatus: 'offline' },
  ],
  chats: [
    {
      id: 'chat-1',
      contactId: '1',
      unreadCount: 1,
      messages: [
        { id: 'msg1', text: 'Hey, how are you?', timestamp: '9:15 PM', senderId: '1', status: 'read' },
        { id: 'msg2', text: 'I am good, thanks for asking!', timestamp: '9:16 PM', senderId: 'me', status: 'read' },
      ],
    },
    {
      id: 'chat-2',
      contactId: '2',
      unreadCount: 0,
      messages: [
        { id: 'msg3', text: 'Meeting tomorrow at 10 AM.', timestamp: 'Yesterday', senderId: '2', status: 'read' },
      ],
    }
  ],
  incognitoChats: [],
  statuses: [
    { id: 'status-1', contactId: 'me', imageUrl: 'https://i.pravatar.cc/400?img=50', timestamp: 'Today, 10:30 AM', viewed: true },
    { id: 'status-2', contactId: '2', imageUrl: 'https://i.pravatar.cc/400?img=12', timestamp: 'Today, 9:45 AM', viewed: false },
    { id: 'status-3', contactId: '3', imageUrl: 'https://i.pravatar.cc/400?img=22', timestamp: 'Yesterday, 8:00 PM', viewed: true },
  ],
  calls: [
    { id: 'call-1', contactId: '1', type: CallType.AUDIO, direction: 'incoming', timestamp: 'Today, 11:45 AM' },
    { id: 'call-2', contactId: '3', type: CallType.VIDEO, direction: 'outgoing', timestamp: 'Today, 10:15 AM' },
    { id: 'call-3', contactId: '4', type: CallType.AUDIO, direction: 'missed', timestamp: 'Yesterday, 9:00 PM' },
  ],
};
