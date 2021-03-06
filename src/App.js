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
        <h2>Seconds Remaining: {props.timer}</h2>
      </div>
      <container className="flexcontainer">
        <a id="button-left" onClick={ 
          () =>  { 
            props.nextQuestion(0);
            props.startTimer();
          }} className="flex-center-vertically">
          <span>{ questionList[props.question][0] }</span>
        </a>
        <a id="button-right" onClick={ 
          () => { 
            props.nextQuestion(1) 
            props.startTimer();
          }} className="flex-center-vertically">
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
      timer: 10,
    };

    this.question = -1;
    this.answerList = [];
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.retakeQuiz = this.retakeQuiz.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.setState = this.setState.bind(this);
  }

  startQuiz() {
    this.setState({question: 0});
  }

  startTimer(question) {
    let tenTimer = setTimeout( () => {
      this.setState(prevState => {
        prevState.timer--;
        if (this.question !== question) {
          console.log('done');
        } else if (prevState.question !== 3 && prevState.timer === -1) {
          prevState.timer = 10;
          prevState.question++;
          this.answerList.push("Did not answer");
          this.question++;
        } else {
          console.log(prevState.timer);
          this.startTimer();
        }
    })}, 1000);
  }

  nextQuestion (index) {
    this.setState(prevState => {
      this.answerList.push(questionList[prevState.question][index]);
      prevState.question++;
      prevState.timer = 10;
    });
    console.log(this.answerList);
    console.log(this.state.question);
  }

  retakeQuiz() {
    console.log(this.state.question, this.answerList);
    this.setState({question: -1, timer: 10});
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
          startTimer = { () => { this.startTimer(0) } }
        />
      );
    } else {
      return (
        <AskQuestion 
        nextQuestion = { this.nextQuestion } 
        question = { this.state.question}
        timer = { this.state.timer }
        startTimer = { () => { this.startTimer(++this.question) } }
        />
      )
    }
  }
}

export default App;
