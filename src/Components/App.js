import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import questionList from '../questionList';

import Results from './Results';
import AskQuestion from './AskQuestion';
import StartGame from './StartGame';

class App extends Component {
  constructor () {
    super();
    this.state = {
      question: -1,
      timer: 10
    };

    this.answerList = [];
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.retakeQuiz = this.retakeQuiz.bind(this);
  }

  startQuiz() {
    this.setState(prevState => {
      this.startTimer(this.state.question);
      prevState.question++;
    });
  }

  startTimer(question) {
    this.setState({ timer: 11 });
    this.tickTimer(++question);
  }
  
  tickTimer(question) {
    setTimeout(() => {
      this.setState(prevState => {
        if (this.state.question !== question || question === 3) {
          return;
        } else if (--prevState.timer === 0) {
          this.startTimer(prevState.question);
          this.answerList.push('did not answer');
          prevState.question++;
        } else {
          this.tickTimer(question);
        }
      });
    }, 1000);
    
  }

  nextQuestion (index) {
    this.setState(prevState => {
      this.startTimer(prevState.question);
      this.answerList.push(questionList[prevState.question][index]);
      prevState.question++;
    });
  }

  retakeQuiz() {
    this.setState({ question: -1 });
    this.answerList = [];
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
        />
      );
    } else {
      return (
        <AskQuestion 
        nextQuestion = { (index) => this.nextQuestion(index) } 
        question = { this.state.question }
        timer = { this.state.timer }
        />
      )
    }
  }
}

export default App;
