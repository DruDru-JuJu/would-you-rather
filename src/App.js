import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import questionList from './questionList';

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
            props.startTimer();
          }}>
          Start
        </a>
      </container>
    </div>
  )
}

const AskQuestion = props => {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Would you rather...</h1>
        <h2>Seconds Remaining: {props.Timer}</h2>
      </div>
      <container className="flexcontainer">
        <a id="button-left" onClick={ () => props.nextQuestion(0) } className="flex-center-vertically">
          <span>{ questionList[props.question][0] }</span>
        </a>
        <a id="button-right" onClick={ () => props.nextQuestion(1) } className="flex-center-vertically">
          <span>{ questionList[props.question][1] }</span>
        </a>
      </container>
    </div>
  )
}

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

class App extends Component {
  constructor () {
    super();
    this.state = {
      question: -1,
      secondsPassed: 0,
    };

    this.answerList = [];
    this.Timer = 10 - this.state.secondsPassed;
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.retakeQuiz = this.retakeQuiz.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  startQuiz() {
    this.setState({question: 0});
  }

  startTimer() {
    this.setState ( (prevState => {
        setInterval(function () {
        prevState.secondsPassed + 1;
      }, 1000);
    }))
    console.log(this.state.secondsPassed);
  }

  nextQuestion (index) {
    this.setState(prevState => {
      this.answerList.push(questionList[prevState.question][index]);
      prevState.question++;
    });
    console.log(this.answerList);
  }

  retakeQuiz() {
    console.log(this.state.question, this.answerList);
    this.setState({question: -1});
    this.answerList=[];
  }

  render () {
    if (this.state.question === 3) {
      return (
        <div>
          <Results 
            answerList = { this.answerList }
            retakeQuiz = { this.retakeQuiz }
          />
        </div>
      )
    } else if (this.state.question === -1) {
      return (
        <StartGame 
          startQuiz = { this.startQuiz }
          startTimer = { this.startTimer }
        />
      );
    } else {
      return (
        <AskQuestion 
        nextQuestion = { this.nextQuestion } 
        question = { this.state.question}
        Timer = { this.Timer }
        />
      )
    }
  }
}

export default App;