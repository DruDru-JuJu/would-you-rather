import React from 'react';

const StartGame = props => {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Would you rather...</h1>
      </div>
      <container className="flexcontainer">
        <a className="flex-center-vertically" onClick={ 
          () => { 
            props.startQuiz();
          }}>
          Start
        </a>
      </container>
    </div>
  )
}

export default StartGame;