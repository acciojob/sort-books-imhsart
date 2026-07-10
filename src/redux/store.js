import { createStore, combineReducers } from "redux";
import sortReducer from "./reducer";

const rootReducers = combineReducers({
  sort: sortReducer
})

const store = createStore(rootReducers)
export default store
