import { createStore } from "vuex";
import { auth } from "./auth.module";
import { tutorial } from "./tutorial.module";

const store = createStore({
  modules: {
    auth,
    tutorial
  },
});

export default store;
