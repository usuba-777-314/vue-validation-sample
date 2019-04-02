import Vue from "vue";
import Vuex from "vuex";

import userForm from "./userForm";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userForm
  }
});
