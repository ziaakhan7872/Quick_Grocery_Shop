import { USERDATA, CARTITEM, SELECTEDADDRESS, ISFIRSTINSTALL, ISUSERLOGIN } from '../types'
const initState = {
  userData: [],
  referal: [],
  cartItem: 0,
  selectedAddress: '',
  isfirstinstall: true,
  isuserlogin: false

}
const userdataReducer = (state = initState, action) => {
  switch (action.type) {
    case USERDATA:
      return {
        ...state,
        userData: action.payload,
      }
    case CARTITEM:
      return {
        ...state,
        cartItem: action.payload,
      }
    case SELECTEDADDRESS:
      return {
        ...state,
        selectedAddress: action.payload,
      }
    case ISFIRSTINSTALL:
      return {
        ...state,
        isfirstinstall: action.payload,
      }
    case ISUSERLOGIN:
      return {
        ...state,
        isuserlogin: action.payload,
      }
    default:
      return state
  }

}

export default userdataReducer
