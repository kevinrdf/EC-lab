<script>
export default {
  name: "HomeView",
  props: ["displayName", "img", "followers"],
};
</script>

<template>
  <div>
    <h1>{{ displayName }}</h1>
  </div>
  <div>
    <img :src="img" />
  </div>
  <h2>Followers: {{ followers }}</h2>
</template>
