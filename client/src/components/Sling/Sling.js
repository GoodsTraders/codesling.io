import React, { Component } from 'react';
import CodeMirror from 'react-codemirror2';
import io from 'socket.io-client/dist/socket.io.js';
import { throttle } from 'lodash';

import Button from '../globals/Button';
import StdOut from './StdOut';
import EditorHeader from './EditorHeader';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import './Sling.css';

class Sling extends Component {
  state = {
    text: '',
    testText: '',
    stdout: '',
    testout: ''
  }

  runCode = () => {
    this.socket.emit('client.run');
  }

  runTest = () => {
    this.socket.emit('client.test');
  }

  componentDidMount() {
    this.socket = io(process.env.REACT_APP_SOCKET_SERVER_URL, {
      query: {
        roomId: this.props.slingId,
      }
    });

    this.socket.on('connect', () => {
      this.socket.emit('client.ready');
    });

    this.socket.on('server.initialState', ({ id, text, testText }) => {
      this.setState({ id, text, testText });
    });

    this.socket.on('server.changed', ({ text }) => {
      this.setState({ text });
    });

    this.socket.on('server.testChanged', ({ testText }) => {
      this.setState({ testText });
    });

    this.socket.on('server.run', ({ stdout }) => {
      this.setState({ stdout });
    });

    this.socket.on('server.runTest', ({ testout }) => {
      this.setState({ testout });
    });

    window.addEventListener('resize', this.setEditorSize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.setEditorSize);
  }

  handleChange = throttle((editor, metadata, value) => {
    this.socket.emit('client.update', { text: value });
  }, 250)

  setEditorSize = throttle(() => {
    this.editor.setSize(null, `${window.innerHeight - 80}px`);
  }, 100);

  handleTest = throttle((editor, metadata, value) => {
    this.socket.emit('client.updateTest', { testText: value });
  }, 250)

  // handleTest(e) {
  //   this.setState({
  //     testText: e.target.value
  //   })
  // }

  initializeEditor = (editor) => {
    // give the component a reference to the CodeMirror instance
    this.editor = editor;
    this.setEditorSize();
  }

  render() {
    return (
      <div className='container-fluid'>

        <div className="sling-container">
        <h5 className='box-header' id='code-header'>Code</h5>
          <EditorHeader />
        <div className='row'>
          <div className='col-lg-6'>
            <div className="code-editor-container">
              <CodeMirror
                editorDidMount={this.initializeEditor}
                value={this.state.text}
                options={{
                  mode: 'javascript',
                  lineNumbers: true,
                  theme: 'base16-dark',
                }}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className='col-lg-6'>
            <div className="stdout-container">
              <Button
                className="run-btn"
                text="Run Code"
                backgroundColor="red"
                color="white"
                onClick={this.runCode}
              />
              <StdOut 
                text={this.state.stdout}
              />
            </div>
          </div>
        </div>

        <hr id='hr-divider'/>

        <div className='row'>
          <div className='col-lg-6'>
              <h5 className='box-header'>Test Cases</h5>
              <div className="code-editor-container">
                <CodeMirror
                  editorDidMount={this.initializeEditor}
                  value={this.state.testText}
                  options={{
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: 'base16-dark',
                  }}
                  onChange={this.handleTest}
                />
              </div>
              {/* <input type='text' onChange={this.handleTest} />
              <button type='button' onClick={this.runTest.bind(this)} >Click to Test</button> */}
            </div>
            <div className='col-lg-6'>
              <div className="stdout-container">
                <Button
                  className="run-btn"
                  text="Run Tests"
                  backgroundColor="red"
                  color="white"
                  onClick={this.runTest}
                />
                <StdOut 
                  text={this.state.testout}
                />
              </div>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default Sling;
