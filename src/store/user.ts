import { produce } from 'immer';
import { create } from 'zustand';

interface UserInfo {
  name: string;
  age: number;
}

interface UserState {
  userInfo: UserInfo;
  token: string;
  updateUserInfo: (parmas: UserInfo) => void;
  updateAge: (params: number) => void;
  updateToken: (params: string) => void;
}

// 创建状态存储
const useUserStore = create<UserState>((set) => ({
  userInfo: {
    name: 'ty',
    age: 100,
  },
  token: 'bear token1',

  updateUserInfo: (userInfo) => set({ userInfo }), //合并userInfo

  updateAge: (age) =>
    set(
      produce((state) => {
        state.userInfo.age = age;
      }),
    ),

  updateToken: (token) => set({ token }),
}));

export default useUserStore;
