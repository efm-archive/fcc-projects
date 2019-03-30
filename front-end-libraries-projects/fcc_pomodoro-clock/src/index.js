import React from 'react';
import ReactDOM from 'react-dom';

class Select extends React.Component {
  render() {
    return (
      <div className="selector">
        <div id={this.props.id}>{this.props.label}</div>
        <button id={this.props.decLabel} onClick={this.props.decrement}>
          -
        </button>

        <div id={this.props.lengthLabel}>{this.props.value}</div>
        <button id={this.props.incLabel} onClick={this.props.increment}>
          +
        </button>
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
      //status session, break
      status: 'session',
      sessionMin: 25,
      sessionSec: 60,
      breakMin: 5,
      breakSec: 3,
      timer: 60
    };
  }

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

  handleResetButton = () => {
    //console.log('handleResetButton clicked');
    this.setState({ playing: false });
    this.handleAudio('reset');
    this.resetTimerDefault();
  };

  handlePlayToggle = () => {
    this.setState({ playing: !this.state.playing });
    this.handlePlay();
  };

  switchTimer = status => {
    console.log('switchTimer called - status:', status);
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

  handlePlay = () => {
    this.startCountdown(this.state.status);
  };

  startCountdown = status => {
    console.log('startCountdown called - status:', status);
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
      if (this.state.timer <= 0) {
        clearInterval(countdown);
        this.switchTimer(status);
        this.handleAudio('play');
        return;
      }
    }, 1000);
  };

  handleAudio = key => {
    const audio = document.querySelector(`audio`);
    if (key == 'reset') {
      console.log('resetting audio');
      audio.currentTime = 0;
      audio.pause();
    }
    if (key == 'play') {
      audio.currentTime = 0;
      audio.play();
    }
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
              label={this.state.status}
            />
          </div>
        </div>

        <div className="button" id="start_stop" onClick={this.handlePlayToggle}>
          {!this.state.playing ? `START` : `STOP`}
        </div>
        <div
          className="button"
          id="test-reset"
          onClick={this.handleResetButton}
        >
          RESET
        </div>
        <div
          className="button"
          id="test-session"
          onClick={() => {
            this.setState({
              status: 'session',
              timer: this.state.sessionSec
            });
          }}
        >
          SESSION
        </div>
        <div
          className="button"
          id="test-break"
          onClick={() => {
            this.setState({
              status: 'break',
              timer: this.state.breakSec
            });
          }}
        >
          BREAK
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
