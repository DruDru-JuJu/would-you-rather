import React from 'react';
import questionList from '../questionList';


const AskQuestion = props => {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Would you rather...</h1>
        <h2>Seconds Remaining: {props.timer}</h2>
      </div>
      <container className="flexcontainer">
        <a id="button-left" onClick={ 
          () =>  { 
            props.nextQuestion(0);
          }} className="flex-center-vertically">
          <span>{ questionList[props.question][0] }</span>
        </a>
        <a id="button-right" onClick={ 
          () => { 
            props.nextQuestion(1) 
          }} className="flex-center-vertically">
          <span>{ questionList[props.question][1] }</span>
        </a>
      </container>
    </div>
  )
}

export default AskQuestion;