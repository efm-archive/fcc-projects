import React from 'react';
import ReactDOM from 'react-dom';

class Drum extends React.Component {
  render() {
    const { keyP, link } = this.props;
    return (
      <div className="drum-pad" id={keyP} onClick={this.props.click}>
        {keyP}
        <audio id={keyP} src={link} className="clip" />
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: ''
    };
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress = e => {
    const key = String.fromCharCode(e.keyCode);
    this.handlePlaying(key);
  };

  handleOnClick = key => {
    this.handlePlaying(key);
  };

  handlePlaying = key => {
    const audio = document.querySelector(`audio[id="${key}"]`);
    const drum = drums.filter(item => item.letter == key);
    if (!audio) return;
    if (audio) {
      const desc = drum[0].desc;
      setTimeout(() => {
        this.setState({ playing: '' });
      }, audio.duration * 1000);
      audio.currentTime = 0;
      audio.play();
      this.setState({ playing: desc });
    }
  };

  render() {
    return (
      <div id="drum-machine">
        <h1 id="title">Drum Machine</h1>
        <div id="display">
          {drums.map((drum, i) => (
            <Drum
              key={drum.letter}
              keyP={drum.letter}
              link={drum.link}
              click={() => {
                this.handleOnClick(drum.letter);
              }}
            />
          ))}
          <div id="playing">{this.state.playing}</div>
        </div>
      </div>
    );
  }
}

const drums = [
  {
    letter: 'Q',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553270893/fcc_files/CYCdh_LudRimC-05.mp3',
    desc: 'ching'
  },
  {
    letter: 'W',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281810/fcc_files/CYCdh_ElecK01-Kick02.mp3',
    desc: 'chang'
  },
  {
    letter: 'E',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281810/fcc_files/PearlPiccolo_Side_SnrOn-02.mp3',
    desc: 'chong'
  },
  {
    letter: 'A',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281811/fcc_files/CYCdh_LudSnrOffC-04.mp3',
    desc: 'bing'
  },
  {
    letter: 'S',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281810/fcc_files/CYCdh_ElecK01-Snr03.mp3',
    desc: 'bang'
  },
  {
    letter: 'D',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281810/fcc_files/CYCdh_ElecK01-Tom02.mp3',
    desc: 'bong'
  },
  {
    letter: 'Z',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281810/fcc_files/CYCdh_ElecK03-Snr01.mp3',
    desc: 'click'
  },
  {
    letter: 'X',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281810/fcc_files/CYCdh_ElecK01-ClHat02.mp3',
    desc: 'clack'
  },
  {
    letter: 'C',
    link:
      'https://res.cloudinary.com/deqzipan/video/upload/v1553281810/fcc_files/CYCdh_ElecK01-OpHat02.mp3',
    desc: 'clock'
  }
];

ReactDOM.render(<App />, document.getElementById('root'));
