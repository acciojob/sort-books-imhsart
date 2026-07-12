import { SUCCESS, FAILURE, LOADING, SORT } from "./actionTypes";

const initialState = {
  loading: false,
  data: [],
  error: ''
}

const sortReducer = (state=initialState, action) => {
  switch(action.type){
    case SUCCESS: 
      return {
        loading: false,
        data: action.payload,
        error: ''
      }
    case FAILURE:
      return {
        loading: false,
        data: [],
        error: action.payload
      }

    case LOADING:
      return {
        ...state,
        loading: true
      }

    case SORT:
      const {category, order} = action.payload
      const sorted = [...state.data].sort((a,b) => order === 'asc' ? a[category].localeCompare(b[category]) : b[category].localeCompare(a[category]))

      return {
        ...state,
        data: sorted
      }

    default:
      return state
  }
}

export default sortReducer