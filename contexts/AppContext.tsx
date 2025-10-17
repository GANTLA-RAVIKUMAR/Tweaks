import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { produce } from 'immer';
import { AppState, Action, AppContextType } from '../types';
import { initialState } from '../data';

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  return produce(state, draft => {
    switch (action.type) {
      case 'SIGNUP':
        const newUser = {
          id: `user-${Date.now()}`,
          ...action.payload,
          avatar: `https://i.pravatar.cc/150?u=${action.payload.mobile}`,
          statusText: 'Hey there! I am using Tweaks.'
        };
        draft.users.push(newUser);
        break;
      
      case 'LOGIN':
        const existingUser = draft.users.find(u => u.mobile === action.payload.mobile);
        if (existingUser) {
          draft.isAuthenticated = true;
          draft.myInfo = { ...existingUser };
        }
        break;

      case 'LOGOUT':
        return initialState; // Reset state completely

      case 'SEND_MESSAGE': {
        const { chatId, message, isIncognito } = action.payload;
        const chatList = isIncognito ? draft.incognitoChats : draft.chats;
        const chat = chatList.find(c => c.id === chatId);
        if (chat) {
          chat.messages.push(message);
        }
        break;
      }
      
      case 'START_CHAT': {
        const { contactId, id } = action.payload;
        const newChat = {
          id,
          contactId,
          messages: [],
          unreadCount: 0,
        };
        draft.chats.push(newChat);
        break;
      }

      case 'START_INCOGNITO_CHAT': {
        const { contactId, id } = action.payload;
        const newIncognitoChat = {
          id,
          contactId,
          messages: [],
          unreadCount: 0,
        };
        draft.incognitoChats.push(newIncognitoChat);
        break;
      }

       case 'UPDATE_PROFILE':
        if (draft.myInfo) {
          draft.myInfo.name = action.payload.name;
          draft.myInfo.statusText = action.payload.statusText;
        }
        break;
      
      case 'ADD_STATUS':
        if(draft.myInfo){
            const newStatus = {
                id: `status-${Date.now()}`,
                contactId: draft.myInfo.id,
                viewed: true, // Own status is always 'viewed'
                ...action.payload,
            };
            // Replace my existing status
            const myStatusIndex = draft.statuses.findIndex(s => s.contactId === draft.myInfo?.id);
            if (myStatusIndex > -1) {
                draft.statuses[myStatusIndex] = newStatus;
            } else {
                draft.statuses.unshift(newStatus);
            }
        }
        break;

      default:
        break;
    }
  });
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
