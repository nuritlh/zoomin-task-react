// import { ADD_MOVIES } from "../constants/action-types";
const forbiddenWords = ["spam", "money"];

export function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do your stuff
      // if (action.type === ADD_MOVIES) {
      //   const foundWord = forbiddenWords.filter(word =>
      //     action.payload.title.includes(word)
      //   );
      // }
      return next(action);
    };
  };
}