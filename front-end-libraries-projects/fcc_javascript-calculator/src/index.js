import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: '',
      hasDecimal: false,
      display: 0,
      lastOperator: '',
      result: ''
    };
  }

  handleDecimalButton = digit => {
    if (!this.state.hasDecimal) {
      this.setState({ hasDecimal: true });
      this.handleDigitButton(digit);
    }
  };

  handleDigitButton = digit => {
    if (this.state.display == 0) {
      this.setState({ display: digit, queue: this.state.queue + digit });
    } else {
      this.setState({
        display: this.state.display + digit,
        queue: this.state.queue + digit
      });
    }
    this.setState({
      result: '',
      lastOperator: ''
    });
  };

  handleOperatorButton = operator => {
    if (!this.state.lastOperator == '') {
      let queue = this.state.queue.slice(0, -1);
      this.setState({
        queue: queue + operator,
        display: operator
      });
      return;
    } else {
      this.setState({
        queue: this.state.queue + operator,
        display: operator,
        lastOperator: operator,
        hasDecimal: '',
        result: ''
      });
    }
  };

  handleResultButton = () => {
    const sanitized = this.state.queue.replace(/[^\d+-/*.]/g, '');
    const result = eval(sanitized);

    this.setState({
      queue: result,
      result: result,
      display: ''
    });
  };

  handleUndoButton = () => {
    if (this.state.queue === this.state.result) {
      return;
    }
    this.setState({
      queue: this.state.queue.replace(this.state.display, ''),
      display: '0'
    });
  };

  handleClearAllButton = () => {
    this.setState({
      queue: '',
      hasDecimal: false,
      result: '',
      display: 0
    });
  };

  render() {
    return (
      <div id="calculator">
        <h1>Javascript Calculator</h1>
        <div id="main">
          <div className="screen" id="screen">
            <div id="queue">
              <span>{this.state.queue}</span>
            </div>
            <div id="display">
              <span>
                {!this.state.result ? this.state.display : this.state.result}
              </span>
            </div>
          </div>
          <div
            className="button"
            id="one"
            onClick={() => {
              this.handleDigitButton('1');
            }}
          >
            <span>1</span>
          </div>
          <div
            className="button"
            id="two"
            onClick={() => {
              this.handleDigitButton('2');
            }}
          >
            <span>2</span>
          </div>
          <div
            className="button"
            id="three"
            onClick={() => {
              this.handleDigitButton('3');
            }}
          >
            <span>3</span>
          </div>
          <div
            className="button"
            id="four"
            onClick={() => {
              this.handleDigitButton('4');
            }}
          >
            <span>4</span>
          </div>
          <div
            className="button"
            id="five"
            onClick={() => {
              this.handleDigitButton('5');
            }}
          >
            <span>5</span>
          </div>
          <div
            className="button"
            id="six"
            onClick={() => {
              this.handleDigitButton('6');
            }}
          >
            <span>6</span>
          </div>
          <div
            className="button"
            id="seven"
            onClick={() => {
              this.handleDigitButton('7');
            }}
          >
            <span>7</span>
          </div>
          <div
            className="button"
            id="eight"
            onClick={() => {
              this.handleDigitButton('8');
            }}
          >
            <span>8</span>
          </div>
          <div
            className="button"
            id="nine"
            onClick={() => {
              this.handleDigitButton('9');
            }}
          >
            <span>9</span>
          </div>
          <div
            className="button"
            id="zero"
            onClick={() => {
              this.handleDigitButton('0');
            }}
          >
            <span>0</span>
          </div>
          <div
            className="button"
            id="decimal"
            onClick={() => {
              this.handleDecimalButton('.');
            }}
          >
            <span>.</span>
          </div>
          <div
            className="button"
            id="equals"
            onClick={() => {
              this.handleResultButton('=');
            }}
          >
            <span>=</span>
          </div>
          <div
            className="button"
            id="add"
            onClick={() => {
              this.handleOperatorButton('+');
            }}
          >
            <span>+</span>
          </div>
          <div
            className="button"
            id="subtract"
            onClick={() => {
              this.handleOperatorButton('-');
            }}
          >
            <span>-</span>
          </div>
          <div
            className="button"
            id="multiply"
            onClick={() => {
              this.handleOperatorButton('*');
            }}
          >
            <span>*</span>
          </div>
          <div
            className="button"
            id="divide"
            onClick={() => {
              this.handleOperatorButton('/');
            }}
          >
            <span>/</span>
          </div>
          <div
            className="button"
            id="undo"
            onClick={() => {
              this.handleUndoButton();
            }}
          >
            <span>C</span>
          </div>
          <div
            className="button"
            id="clear"
            onClick={() => {
              this.handleClearAllButton();
            }}
          >
            <span>CE</span>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
