<script>
export default {
  name: "HomeView",
  props: ["name", "tracks", "img", "date"],
};
</script>

<template>
  <div class="album">
    <img width="200" height="200" :src="img" />
    <h1>{{ name }}</h1>
    <h2>{{ date }}</h2>
  </div>
</template>

<style scoped>
.album {
  white-space: nowrap;
  width: 300px;
  height: 350px;
  border-style: solid;
  border-radius: 5px;
  border-color: grey;
}

.album:hover {
  background-color: rgb(49, 49, 49);
}

h1 {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
