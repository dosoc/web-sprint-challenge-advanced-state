import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import * as actions from '../state/action-creators'

function Quiz(props) {

  useEffect(()=>{
    if (!props.quiz) props.fetchQuiz()
  },[])

  const handleSelected = (id) =>{
    const questionID = props.quiz.quiz_id
    const answerID = {
      quiz_id: questionID,
      answer_id: id
    }
    props.selectAnswer(answerID)
  }
  const handleSubmit = () => {
    props.postAnswer(props.selectedAnswer)
  }
  return (
    <div id="wrapper">
      {props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>
            

            <div id="quizAnswers">
              {props.quiz.answers.map(ans=>{
                  return (
                    <div className={props.selectedAnswer && props.selectedAnswer.answer_id === ans.answer_id?"answer selected":"answer"} key={ans.answer_id}>
                    {ans.text}
                    <button  onClick={()=>handleSelected(ans.answer_id)}>
                      {props.selectedAnswer && props.selectedAnswer.answer_id === ans.answer_id?"SELECTED":"select"}
                    </button>
                  </div>
                  )
                  })}
            </div>

            <button disabled={!props.selectedAnswer} id="submitAnswerBtn" onClick={handleSubmit}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStatetoProps = state => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}
export default connect(mapStatetoProps, actions)(Quiz)