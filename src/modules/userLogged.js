export default {
  namespaced: true,
  state:{
    userLoggedState:{
      id: null,
      firstName: '',
      lastName: '',
      email:'',
      role:{
        id: null,
        name: '',
      },
      isAuthenticated: false,
    }
  },
  mutations: {
    SET_USER_LOGGED(state, payload){
      state.userLoggedState.id = payload.id;
      state.userLoggedState.firstName = payload.firstName;
      state.userLoggedState.lastName = payload.lastName;
      state.userLoggedState.email = payload.email;
        state.userLoggedState.role.id = payload.role.id;
        state.userLoggedState.role.name = payload.role.name;
    },
    SET_AUTHENTICATED(state, payload){
      state.userLoggedState.isAuthenticated = payload;
    },
    SET_DEFAULT_USER_DATA(state){

      state.userLoggedState.id = null;
      state.userLoggedState.firstName = '';
      state.userLoggedState.lastName = '';
      state.userLoggedState.email = '';
        state.userLoggedState.role.id = null;
        state.userLoggedState.role.name = '';
    }
  },
  actions:{

  },
  getters:{
    GET_USER_LOGGED(state){
      return state.userLoggedState;
    },
    GET_AUTHENTICATED(state){
      return state.userLoggedState.isAuthenticated;
    },
  }
}
