<script>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import { useUserStore } from "./stores/user";
import router from "./router/index.js";
import spotifyAPI from "./utils/spotifyAPI";
import { mapStores } from "pinia";

export default {
  name: "App",
  computed: {
    ...mapStores(useUserStore),
  },
  components: {
    HelloWorld,
    RouterLink,
    RouterView,
  },
};

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.name === "logout" && userStore.isAuthenticated()) {
    userStore.logout();
    return next({ name: "login" });
  }
  if (to.name === "loginCallback" && Object.keys(to.query).length) {
    const code = to.query.code;
    const accessToken = spotifyAPI.getAccessToken(code);
    userStore.login("jpazos", accessToken);
    return next({ name: "about" });
  }

  !userStore.isAuthenticated() && to.name !== "login"
    ? next({ name: "login" })
    : next();
});
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="Welcome to Spotify Clone" />

      <nav>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/main">Spotify Main</RouterLink>
        <RouterLink to="/user">Profile</RouterLink>
        <RouterLink v-if="this.userStore.isAuthenticated()" to="/logout"
          >Logout</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
