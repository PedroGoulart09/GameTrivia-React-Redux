import { handleExpiredToken, handleToken } from '../services/requestApi';

const TRES = 3;

export const Rached = (event) => ({
  type: 'RACHED',
  payload: event,
});

export const Token = (event) => ({
  type: 'TOKEN',
  payload: event,
});

export const questions = (event) => ({
  type: 'QUESTIONS',
  payload: event,
});

export function requestToken() {
  return async (dispatch) => {
    const token = await handleToken();
    dispatch(Token(token));
  };
}

export function handleApi() {
  return async (dispatch) => {
    const token = await handleToken();
    const response = await handleExpiredToken(token);
    if (response.response_code === TRES) {
      const newToken = await handleToken();
      const newResponseCode = await handleExpiredToken(newToken);
      return dispatch(questions(newResponseCode.results));
    }
    dispatch(questions(response.results));
  };
}

export const addScore = (event) => ({
  type: 'ADD_SCORE',
  payload: event,
});

export const setUserInfo = (event) => ({
  type: 'SET_USER_INFO',
  payload: event,
});

export const setRanking = (event) => ({
  type: 'SET_RANKING',
  payload: event,
});
