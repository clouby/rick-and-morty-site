<template>
  <img
    alt="Rick and Morty logo"
    class="max-w-xs m-auto"
    src="./assets/logo.png"
  />
  <div class="text-5xl font-extrabold">
    <span>Wiki \</span>
    <span
      class="
        bg-clip-text
        text-transparent
        bg-gradient-to-r
        from-green-400
        to-blue-500
      "
    >
      Rick &amp; Morty
    </span>
  </div>
  <Container> </Container>
</template>

<script>
import Container from "./components/Container.vue";

export default {
  components: {
    Container,
  },
  setup() {},
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 40px;
}
</style>
