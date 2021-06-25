import { combineReducers } from "redux";
import favoritesReducer from "./reducers/favoritesReducer";

//Tüm stateler burada toplanır.
const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

export default rootReducer;