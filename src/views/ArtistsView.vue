<script>
import spotifyAPI from "../utils/spotifyAPI";
import ArtistAlbumComponent from "../components/ArtistAlbumComponent.vue";

export default {
  name: "MainView",
  components: {
    ArtistAlbumComponent,
  },
  methods: {
    a() {
      return "";
    },
  },
  data() {
    return {
      albums: [],
    };
  },
  async created() {
    console.log(this.$route.params);
    const artistAlbums = await spotifyAPI.getArtistAlbums(
      this.$route.params.id
    );
    this.albums = artistAlbums.items;
  },
};
</script>

<template>
  <div class="main">
    <div class="albums-container">
      <ArtistAlbumComponent
        v-for="(album, index) in albums"
        :key="index"
        :name="album.name"
        :img="album.images[0].url"
        :date="album.release_date"
      ></ArtistAlbumComponent>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .main {
    display: flex;
    max-height: 70vh;
    max-width: 70vh;
  }

  .albums-container {
    text-align: center;
    overflow-y: auto;
    vertical-align: middle;
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 10px;
    padding: 10px;
  }
}
</style>
