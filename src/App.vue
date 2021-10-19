<template>
  <img
    alt="Rick and Morty logo"
    class="max-w-xs m-auto"
    src="./assets/logo.png"
  />
  <div class="text-5xl font-extrabold mb-20">
    <span class="text-gray-500">Wiki \</span>
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
  <Container>
    <template v-if="loading">
      <Card v-for="(item, index) of skeletonItems" :key="index" :item="item">
      </Card>
    </template>
    <Card
      v-else
      v-for="character of characters"
      :key="character.id"
      :item="character"
    ></Card>
  </Container>
  <button
    type="button"
    @click="loadMore()"
    v-show="!haveNotNext && !loading"
    class="
      inline-flex
      items-center
      px-4
      py-2
      mb-5
      border border-transparent
      text-base
      leading-6
      font-medium
      rounded-md
      text-white
      bg-green-400
      hover:bg-green-500
      focus:border-green-700
      active:bg-green-700
      transition
      ease-in-out
      duration-150
      cursor-not-allowed
      load-more
    "
    disabled=""
  >
    <svg
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    Load More
  </button>
</template>
dasd
<script>
import { watch, ref, computed, reactive } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";

import Container from "./components/Container.vue";
import Card from "./components/Card.vue";

const GET_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page, filter: { name: "Rick" }) {
      info {
        next
      }
      results {
        id
        name
        status
        image
      }
    }
  }
`;

export default {
  components: {
    Container,
    Card,
  },
  setup() {
    const defaultVariable = reactive({ page: 1 });

    let skeletonItems = ref(new Array(20).fill({}));

    const { result, loading, fetchMore } = useQuery(
      GET_CHARACTERS,
      defaultVariable,
      {}
    );

    const characters = useResult(
      result,
      skeletonItems,
      (data) => data.characters.results
    );

    const info = useResult(result, {}, (data) => data.characters.info);

    const haveNotNext = computed(() => info.value.next === null);

    watch(loading, (value) => {
      if ("IntersectionObserver" in window && !value) {
        const handler = (entries, _observer) => {
          for (const entry of Array.from(entries)) {
            if (entry.isIntersecting) {
              if (haveNotNext.value) {
                _observer.unobserve(entry.target);
              } else {
                loadMore();
              }
            }
          }
        };

        const observer = new window.IntersectionObserver(handler, {
          rootMargin: "0px 0px 0px 0px",
        });

        const loadMoreElement = document.querySelector(".load-more");

        observer.observe(loadMoreElement);
      }
    });

    function loadMore() {
      if (!haveNotNext.value) {
        fetchMore({
          variables: {
            page: info.value.next,
          },
        });
      }
    }

    return {
      result,
      loading,
      loadMore,
      haveNotNext,
      characters,
      skeletonItems,
    };
  },
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
