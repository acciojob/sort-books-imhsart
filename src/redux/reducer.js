import { SUCCESS, FAILURE, LOADING, SORT } from "./actionTypes";

const initialState = {
  loading: false,
  data: [],
  error: '',
  category: 'title',
  order: 'asc'
}

const sortBooks = (data, category, order) => {
  return [...data].sort((a, b) =>
    order === 'asc'
      ? a[category].localeCompare(b[category])
      : b[category].localeCompare(a[category])
  );
}

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return {
        ...state,
        loading: false,
        data: sortBooks(action.payload, state.category, state.order),
        error: ''
      }

    case FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload
      }

    case LOADING:
      return {
        ...state,
        loading: true
      }

    case SORT: {
      const { category, order } = action.payload;
      return {
        ...state,
        category,
        order,
        data: sortBooks(state.data, category, order)
      }
    }

    default:
      return state
  }
}

export default sortReducer