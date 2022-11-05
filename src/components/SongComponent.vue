<script>
export default {
  name: "SongComponent",
  props: ["name", "num", "album", "added", "duration", "img"],
  methods: {},
  created() {},
};
</script>

<template>
  <tr>
    <td>{{ num }}</td>
    <td class="title">
      <img class="image" width="50" height="50" :src="img" />
      <div class="underline">{{ name }}</div>
    </td>
    <td>
      <div class="underline">{{ album }}</div>
    </td>
    <td>{{ added }}</td>
    <td>{{ duration }}</td>
  </tr>
</template>

<style scoped>
.title {
  display: flex;
}

tr:hover {
  cursor: pointer;
}

div.underline:hover {
  text-decoration: underline;
}

.image {
  margin: 10px;
}
</style>
