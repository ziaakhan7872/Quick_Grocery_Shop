import { USERDATA, CARTITEM, SELECTEDADDRESS, ISFIRSTINSTALL, ISUSERLOGIN } from '../types'

export const SaveUserData = (data) => {
  console.log("🚀 Dispatching SaveUserData", data);
  return {
    type: USERDATA,
    payload: data,
  }
}

export const AddtoCart = (data) => {
  return {
    type: CARTITEM,
    payload: data,
  }
}

export const Saveactiveaddress = (data) => {
  return {
    type: SELECTEDADDRESS,
    payload: data,
  }
}
export const Savefirstinstall = (data) => {

  return {
    type: ISFIRSTINSTALL,
    payload: data,
  }
}

export const Saveuserislogin = (data) => {
  return {
    type: ISUSERLOGIN,
    payload: data,
  }
}