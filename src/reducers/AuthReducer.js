export const AuthReducer = (state, action) => {
  switch (action.type) {
      case 'SIGNIN':
          return {...state, data: action.payload.user, token:action.payload.pass, AuthStatus:true }
      case 'SIGNOUT':
          return { ...state, data: '', token: '', AuthStatus: false }
      default:
          return state;
  }
};