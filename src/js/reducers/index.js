import {
    ADD_MOVIES, SELECTED_MOVIE
} from "../constants/action-types";
const initialState = {
    movies: [],
    currentMovie: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === ADD_MOVIES) {
        return Object.assign({}, state, {
            movies: action.payload
          })
    }

    if (action.type === SELECTED_MOVIE) {
        //set state
        return Object.assign({}, state, {
            currentMovie: action.payload
          })
    }
    return state;
}

export default rootReducer;