import React from 'react';

const Results = props => {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Your choices</h1>
      </div>
      <container>
        <ul>
          {props.answerList.map( (item) => {
            return (
              <li>{item}</li>
            )
          })}
        </ul>
      </container>
      <a onClick = { () => props.retakeQuiz() } >Retake Quiz</a>
    </div>
  )
}

export default Results;