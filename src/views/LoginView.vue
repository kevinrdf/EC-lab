<script>
export default {
  name: "LoginView",
  methods: {
    signIn() {
      return null;
    },
  },
};
</script>

<template>
  <div
    className="flex flex-col items-center bg-black min-h-screen w-full justify-center"
  >
    <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="" />
    <div>
      <button @click="signIn()">Login with {provider.name}</button>
    </div>
  </div>
</template>

<style></style>
