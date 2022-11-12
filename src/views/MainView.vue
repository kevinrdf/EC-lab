<script>
import spotifyAPI from "../utils/spotifyAPI";
import SongComponent from "../components/SongComponent.vue";
import LeftComponent from "../components/LeftComponent.vue";

export default {
  name: "MainView",
  components: {
    SongComponent,
    LeftComponent,
  },
  methods: {
    async updateCurrentTracks(playlistId) {
      const tracks = await spotifyAPI.getPlaylist(playlistId);
      this.currentTracks = tracks.tracks.items;
    },
    toMinutesAndSeconds(millis) {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      return seconds == 60
        ? minutes + 1 + ":00"
        : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
  },
  data() {
    return {
      playlists: [],
      currentTracks: [],
      currentPlaylist: {},
    };
  },
  async created() {
    const userPlaylists = await spotifyAPI.getUserPlaylists();
    this.playlists = userPlaylists.items;
    this.currentPlaylist = this.playlists[1];
    const tracks = await spotifyAPI.getPlaylist(userPlaylists.items[1].id);
    this.currentTracks = tracks.tracks.items;
    console.log(this.currentTracks);
  },
};
</script>

<template>
  <div class="main">
    <div class="left-container">
      <LeftComponent
        :playlists="playlists"
        @change-playlist="(playlistId) => updateCurrentTracks(playlistId)"
      />
    </div>
    <div class="table-container">
      <table class="table table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>TITLE</th>
            <th>ALBUM</th>
            <th>DATE ADDED</th>
            <th>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-clock"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
                />
                <path
                  d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
                />
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          <SongComponent
            v-for="(trackObject, index) in currentTracks"
            :key="index"
            :num="index + 1"
            :name="trackObject.track.name"
            :album="trackObject.track.album.name"
            :img="trackObject.track.album.images[0].url"
            :added="
              new Date(trackObject.added_at)
                .toString()
                .split(' ')
                .splice(0, 4)
                .join(' ')
            "
            :artist="trackObject.track.artists[0].name"
            :artistId="trackObject.track.artists[0].id"
            :duration="toMinutesAndSeconds(trackObject.track.duration_ms)"
          ></SongComponent>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .main {
    display: flex;
    max-height: 70vh;
    display: auto;
  }

  .table-container {
    overflow: auto;
    vertical-align: middle;
  }

  .left-container {
    width: 250px;
    overflow: auto;
  }
}
</style>
