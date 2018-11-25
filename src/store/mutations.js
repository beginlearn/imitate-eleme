import * as types from "./mutation-types.js"
import state from "./state.js"

const mutations={
	[types.SET_POSITION](state, position){
		//console.log('11'+position);
		state.position=position;
	},
	[types.SET_SHOWPOSITION](state,showPosition){
		state.showPosition=showPosition;
	},
	[types.SET_CITY](state,city){
		state.city=city;
	},
	[types.SET_ORDERADDRESS](state, orderAddress){
		state.orderAddress=orderAddress;
	}
};

export default mutations;