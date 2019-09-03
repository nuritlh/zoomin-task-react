import {
    ADD_MOVIES, SELECTED_MOVIE
} from "../constants/action-types";

export function addMovies(payload) {
    return {
        type: ADD_MOVIES,
        payload
    };
}

export function selecteMovie(payload) {
    return {
        type: SELECTED_MOVIE,
        payload
    };
}