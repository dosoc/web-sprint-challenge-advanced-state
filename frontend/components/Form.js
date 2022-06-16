import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {

  const onChange = evt => {
    const { id, value } = evt.target
    props.inputChange({ id, value })

  }

  const onSubmit = evt => {
    const newQuestion = {
      question_text: props.form.newQuestion.trim(),
      true_answer_text: props.form.newTrueAnswer.trim(),
      false_answer_text: props.form.newFalseAnswer.trim()
    }
    evt.preventDefault()
    props.postQuiz(newQuestion)

  }

  const formValues = !!(props.form.newQuestion.trim() && props.form.newTrueAnswer.trim() && props.form.newFalseAnswer.trim())

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={props.form.newQuestion} />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" value={props.form.newTrueAnswer} />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" value={props.form.newFalseAnswer} />
      <button disabled={!formValues} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
