export const AuthReducer = (state, action) => {
  switch (action.type) {
      case 'SIGNIN':
        localStorage.setItem('data', JSON.stringify(action.payload));
        localStorage.setItem('AuthStatus', true);
          return {...state, AuthStatus:true }
      case 'SIGNOUT':
        localStorage.removeItem('data');
        localStorage.removeItem('AuthStatus');
          return { ...state, AuthStatus: false }
      default:
          return state;
  }
};