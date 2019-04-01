import React from 'react';
import ReactDOM from 'react-dom';

class Select extends React.Component {
  render() {
    return (
      <div className="selector">
        <div className="label" id={this.props.id}>
          {this.props.label}
        </div>
        <div
          className="button"
          id={this.props.incLabel}
          onClick={this.props.increment}
        >
          <span>
            <i className="fas fa-angle-up" />
          </span>
        </div>

        <div className="value" id={this.props.lengthLabel}>
          {this.props.value}
        </div>
        <div
          className="button"
          id={this.props.decLabel}
          onClick={this.props.decrement}
        >
          <span>
            <i className="fas fa-angle-down" />
          </span>
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  convertSec = time => {
    let min = parseInt(time / 60);
    let sec = time % 60;
    if (min < 10) {
      min = `0${min}`;
    }
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };
  render() {
    let time = this.convertSec(this.props.time);
    return (
      <div className={this.props.className}>
        <div id="time-left">{time}</div>
        <div id="timer-label">{this.props.label}</div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      status: 'session',
      sessionMin: 25,
      sessionSec: 1500,
      breakMin: 5,
      breakSec: 300,
      timer: 1500
    };
  }

  resetTimerDefault = () => {
    this.setState({
      sessionMin: 25,
      breakMin: 5,
      sessionSec: 25 * 60,
      breakSec: 5 * 60,
      status: 'session',
      timer: 25 * 60
    });
  };

  handleTimerValues = (min, sec, mode, status) => {
    let time = this.state[min];
    if (mode === 'inc') {
      time += 1;
    }
    if (mode === 'dec') {
      time -= 1;
    }
    if (time <= 1) {
      time = 1;
    }
    if (time > 60) {
      time = 60;
    }
    this.setState({
      [min]: time,
      [sec]: time * 60
    });
    if (status === 'session') {
      this.setState({ timer: time * 60 });
    }
  };

  handleResetButton = () => {
    this.setState({ playing: false });
    this.handleAudio('reset');
    this.resetTimerDefault();
  };

  handlePlayToggle = () => {
    this.setState({ playing: !this.state.playing });
    this.handlePlay();
  };

  handlePlay = () => {
    this.startCountdown(this.state.status);
  };

  handleAudio = what => {
    const audio = document.querySelector(`audio`);
    audio.currentTime = 0;
    if (what === 'reset') {
      audio.pause();
    }
    if (what === 'play') {
      audio.play();
    }
  };

  switchCountdown = status => {
    if (status === 'session') {
      this.setState({
        status: 'break',
        timer: this.state.breakSec
      });
      this.handlePlay();
    }
    if (status === 'break') {
      this.setState({
        status: 'session',
        timer: this.state.sessionSec
      });
      this.handlePlay();
    }
  };

  startCountdown = status => {
    const countdown = setInterval(() => {
      //if playing is false, clear the countdown
      if (!this.state.playing) {
        clearInterval(countdown);
      }
      //if playing is true, substract 1 from timer
      if (this.state.playing) {
        this.setState({ timer: this.state.timer - 1 });
      }
      //if timer reaches 0, clear the countdown, then switch the status/countdown to session/break
      if (this.state.timer < 0) {
        clearInterval(countdown);
        this.handleAudio('play');
        this.switchCountdown(status);
        return;
      }
    }, 1000);
  };

  render() {
    return (
      <div className="main">
        <div id="select">
          <Select
            id="session-label"
            label="Session Length"
            lengthLabel="session-length"
            incLabel="session-increment"
            decLabel="session-decrement"
            increment={() => {
              this.handleTimerValues(
                'sessionMin',
                'sessionSec',
                'inc',
                'session'
              );
            }}
            decrement={() => {
              this.handleTimerValues(
                'sessionMin',
                'sessionSec',
                'dec',
                'session'
              );
            }}
            value={this.state.sessionMin}
          />
          <Select
            id="break-label"
            label="Break Length"
            lengthLabel="break-length"
            incLabel="break-increment"
            decLabel="break-decrement"
            increment={() => {
              this.handleTimerValues('breakMin', 'breakSec', 'inc', 'break');
            }}
            decrement={() => {
              this.handleTimerValues('breakMin', 'breakSec', 'dec', 'break');
            }}
            value={this.state.breakMin}
          />
        </div>
        <div id="clock">
          <div id="display">
            <Display
              time={this.state.timer}
              className={this.state.status}
              label={this.state.status === 'session' ? 'Session' : 'Break'}
            />
          </div>
        </div>
        <div className="controls">
          <div
            className="button"
            id="start_stop"
            onClick={this.handlePlayToggle}
          >
            {!this.state.playing ? (
              <span>
                <i className="fas fa-caret-right" />
              </span>
            ) : (
              <span>
                <i className="fas fa-stop" />
              </span>
            )}
          </div>
          <div className="button" id="reset" onClick={this.handleResetButton}>
            <span>
              <i className="fas fa-undo-alt" />
            </span>
          </div>
        </div>
        <audio
          id="beep"
          src="https://res.cloudinary.com/deqzipan/video/upload/v1553699201/fcc_files/213795__austin1234575__beep-1-sec.mp3"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
