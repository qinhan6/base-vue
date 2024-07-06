import { defineStore } from 'pinia';
import pinia from '@/store';
import { refreshUserInfo, userLogin } from '@/api/user';
import { IUserState } from './types';

export const useUserStoreHook = defineStore('user', {
  state: (): IUserState => {
    return {
      username: '',
      accessToken: '',
      roles: [''],
      refreshToken: '',
    }
  },
  getters: {},
  actions: {
    storeUserLogin(data) {
      return userLogin(data).then(res => {
        this.username = res.username;
        this.accessToken = res.accessToken;
        this.roles = res.roles;
        return res;
      })
    },
    // 刷新用户信息
    refreshUserInfo() {
      if (this.username == '大伟' && this.accessToken != '') {
        refreshUserInfo({
          accessToken: this.accessToken,
        })
          .then((res) => {
            this.username = res.username;
            this.roles = res.roles;
            this.accessToken = res.accessToken;
          })
          .catch(() => {
            this.accessToken = '';
          });
      }
    },
    // 持久化
    persist: {
      key: 'userInfo',
      storage: localStorage,
      paths: ['username', 'accessToken', 'roles'],
    }
  },
});

export function useUserStore () {
  return useUserStoreHook(pinia);
}