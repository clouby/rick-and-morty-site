import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";

// Libs
import apolloClient from "./lib/apollo";

// Components
import App from "./App.vue";

// Styles
import "./index.css";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
});

app.mount("#app");
