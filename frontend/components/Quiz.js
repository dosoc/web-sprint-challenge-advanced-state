import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import * as actions from '../state/action-creators'

function Quiz(props) {
  useEffect(()=>{
    props.fetchQuiz()
  },[])
  console.log(props)
  return (
    <div id="wrapper">
      {props.quiz ? (
          <>
            <h2>{props.quiz.quiz.question}</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                {props.quiz.quiz.answers[0].text}
                <button>
                  SELECTED
                </button>
              </div>

              <div className="answer">
              {props.quiz.quiz.answers[1].text}
                <button>
                  Select
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapStatetoProps = state => {
  return {
    quiz: state.quiz
  }
}
export default connect(mapStatetoProps, actions)(Quiz)