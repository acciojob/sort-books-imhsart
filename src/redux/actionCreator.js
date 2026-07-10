import { SUCCESS, FAILURE, LOADING, SORT } from "./actionTypes";

export const success = (data) => {
  return {
    type: SUCCESS,
    payload: data
  }
}
export const loading = () => {
  return {
    type: LOADING
  }
}
export const failure = (error) => {
  return {
    type: FAILURE,
    payload: error
  }
}
export const sort = (category, order) => {
  return {
    type: SORT,
    payload: {
      category, order
    }
  }
}

