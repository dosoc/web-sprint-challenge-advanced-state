import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import * as actions from '../state/action-creators'

function Quiz(props) {
  console.log(`this is quiz props ${props}`)
  console.log(props)

  useEffect(()=>{
    if (!props.quiz) props.fetchQuiz()
  },[])

  const handleSelected = (id) =>{
    const questionID = props.quiz.quiz.quiz_id
    const answerID = {
      quiz_id: questionID,
      answer_id: id
    }
    props.selectAnswer(answerID)
  }
  return (
    <div id="wrapper">
      {props.quiz ? (
          <>
            <h2>{props.quiz.quiz.question}</h2>
            

            <div id="quizAnswers">
              {props.quiz.quiz.answers.map(ans=>{
                  return (
                    <div className="answer selected" key={ans.answer_id}>
                    {ans.text}
                    <button onClick={()=>handleSelected(ans.answer_id)}>
                      select
                    </button>
                  </div>
                  )
                  })}
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