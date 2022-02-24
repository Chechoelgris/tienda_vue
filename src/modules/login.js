export default {
  namespaced: true,
  state:{
    userLoged:{
      id: '',
      firstName: '',
      lastName: '',
      email:'',

    }
  },
  mutations: {
    SET_USER_LOGED(state, payload){

      state.userLoged.id = payload.id;
      state.userLoged.firstName = payload.firstName;
      state.userLoged.lastName = payload.lastName;
      state.userLoged.email = payload.email;
    }
  },
  actions:{

  },
  getters:{
    GET_USER_LOGED(state){
      return state.userLoged;
    },
  }
}
