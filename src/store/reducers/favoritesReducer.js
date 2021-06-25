import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../actions/favoritesActions";
import { favoritesItems } from "../initialStates/favoritesItems";

const initialState = {
  favoritesItems: favoritesItems,
};

export default function favoritesReducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoritesItems: [...state.favoritesItems, payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoritesItems: state.favoritesItems.filter((f) => f.jobAdvertisement.id !== payload.id),
      };
    default:
      return state;
  }
}
