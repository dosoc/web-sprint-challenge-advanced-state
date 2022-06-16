import * as types from './action-types'
import axios from 'axios'

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: types.MOVE_CLOCKWISE }
 }

export function moveCounterClockwise() {
  return { type: types.MOVE_COUNTERCLOCKWISE }
 }

export function selectAnswer(answer) { 
  return {type: types.SET_SELECTED_ANSWER, payload: answer}
}

export function setMessage(message) {
  return {type: types.SET_INFO_MESSAGE, payload: message}
 }

export function setQuiz(quiz) {
  return {type: types.SET_QUIZ_INTO_STATE, payload: quiz}
 }

export function inputChange({id, value}) {
  return {
    type: types.INPUT_CHANGE,
    payload: { id, value }
  }
}

export function resetForm() {
  return {
    type: types.RESET_FORM,
  }
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios.get("http://localhost:9000/api/quiz/next")
      .then(res=>{
        dispatch(setQuiz(res.data))
      }).catch(err=>{
        console.error(err)
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer(payload) {
  return function (dispatch) {
    axios.post("http://localhost:9000/api/quiz/answer", payload)
      .then(res=> {
        const infoMessage = res.data.message
        dispatch(setQuiz(null))
        dispatch(setMessage(infoMessage))
        dispatch(fetchQuiz())
      })
      .catch(err=> {
        console.error(err)
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz(payload) {
  return function (dispatch) {
    axios.post("http://localhost:9000/api/quiz/new", payload)
    .then(res=> {
      const infoMessage = `Congrats: "${res.data.question}" is a great question!`
      const newQuestion = res.data
      dispatch(setQuiz(newQuestion))
      dispatch(setMessage(infoMessage))
      dispatch(resetForm())
    })
    .catch(err=> {
      console.error(err)
    })
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
