import React from 'react';
import ReactDOM from 'react-dom';
//import marked from 'marked';

var markdownTemp = `
Welcome to the **Markdown Previewer**!
\nRendered by **_marked_**
\n# H1
\n## H2
\n[https://www.google.com](https://www.google.com)
\n1. First item
\n2. Second item

\nBlockquotes:
\n> Like this
\nInline \`code\` has to be escaped.
\nCode Block:
\n\`\`\`javascript
\nvar s = "JavaScript syntax highlighting";
\nalert(s);
\`\`\`
\n![FCC Logo](https://design-style-guide.freecodecamp.org/downloads/glyph.png)

`;

class Editor extends React.Component {
  render() {
    return (
      <div id="editorDiv">
        <textarea
          id="editor"
          name="markdown"
          cols="120"
          rows="20"
          value={this.props.markdown}
          onChange={this.props.change}
        />
      </div>
    );
  }
}

class Markdown extends React.Component {
  displayMarkdown() {
    return { __html: marked(this.props.markdown, { sanitize: true }) };
  }
  render() {
    return (
      <div id="preview" dangerouslySetInnerHTML={this.displayMarkdown()} />
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: markdownTemp,
    };
  }
  handleChange = e => {
    this.setState({ markdown: e.target.value });
  };
  render() {
    return (
      <div id="main">
        <h1 id="title">Markdown Previewer</h1>
        <Editor markdown={this.state.markdown} change={this.handleChange} />
        <Markdown markdown={this.state.markdown} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
