import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

import state from "./state.js"
import * as actions from "./actions.js"
import mutations from "./mutations.js"
import * as getters from "./getters.js"
import createLogger from "vuex/dist/logger"

const debug=process.env.NODE_ENV !=='production';

export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict:debug,
	plugins: debug ? [createLogger()] : []
})