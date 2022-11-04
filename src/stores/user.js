import { defineStore, acceptHMRUpdate } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    name: "",
    accessToken: "",
  }),

  actions: {
    logout() {
      this.name = "";
      this.accessToken = "";
      // we could do other stuff like redirecting the user
    },
    /**
     * Attempt to login a user
     * @param {string} user
     */
    async login(name, accessToken) {
      this.name = name;
      this.accessToken = accessToken;
    },
    isAuthenticated() {
      return this.name !== "" && this.accessToken !== "";
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

//export default useUserStore;
