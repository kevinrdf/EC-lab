<script>
import spotifyAPI from "../utils/spotifyAPI";

export default {
  name: "LoginView",
  methods: {
    signIn() {
      spotifyAPI.spotifyLogin();
    },
  },
};
</script>

<template>
  <div class="login">
    <img
      width="100"
      height="100"
      class="spotify-logo"
      src="../assets/spotifyLogo.png"
      alt=""
    />
    <div>
      <button type="button" class="btn btn-secondary" @click="signIn()">
        Login with Spotify
      </button>
    </div>
  </div>
</template>

<style>
.login {
  text-align: center;
}

.spotify-logo {
  margin: 10px;
}
</style>
