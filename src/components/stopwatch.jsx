import React, { Component } from "react";
import "../App.css";

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0,
    });
  };

  render() {
    const { timerTime } = this.state;
    let ms = ("0" + (timerTime % 1000)).slice(-3);
    // let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    // let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    let endMsg;
    let secondsDiff = (10000 - timerTime) / 1000;
    if (secondsDiff === 0) {
      endMsg = "AMAZING! You nailed it!";
    } else if (secondsDiff > 0) {
      endMsg = "You were " + Math.abs(secondsDiff) + " seconds too early!";
    } else {
      endMsg = "You were " + Math.abs(secondsDiff) + " seconds too late!";
    }

    return (
      <div className="Stopwatch">
        <div className="Stopwatch-header">10 Second Challenge</div>
        <div className="Stopwatch-description">
          can you count 10 seconds in your head?
        </div>
        {this.state.timerOn === false && (
          <div className="Stopwatch-display">
            {seconds} : {ms}
          </div>
        )}
        {this.state.timerOn === true && (
          <div className="Stopwatch-displayPlaceholder"></div>
        )}
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button onClick={this.startTimer}>Start</button>
        )}
        {this.state.timerOn === true && (
          <button onClick={this.stopTimer}>Stop</button>
        )}
        {/* {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={this.startTimer}>Resume</button>
        )} */}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <React.Fragment>
            <div className="endMessage">{endMsg}</div>
            <button onClick={this.resetTimer}>Reset</button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Stopwatch;
