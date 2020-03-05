import React from 'react';
import {
  Editor, EditorState, RichUtils, convertToRaw, convertFromRaw,
} from 'draft-js';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
// import './NotePage.css';



class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      title: "",
      editorState: EditorState.createEmpty(),
      styles : {
        notePageBox : {
          margin: 'auto',
          marginTop: 100,
          width: 800,
          font: "sans-serif",
      },
      }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.saveContent = this.saveContent.bind(this);
  }

  onChange(editorState) {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    // console.log(convertToRaw(contentState));
    this.setState({
      editorState,
    });
  }

  saveContent() {
    debounce((content) => {
      const convertedData = {
        title: 'TEST',
        // author: "testUser",
        content: JSON.stringify(convertToRaw(content)),
      };
      // console.log("CONVERtedData",JSON.stringify(convertedData));
      fetch(`/api/v1/posts/${this.state.id}`, {
        method: 'PUT',
        body: JSON.stringify(convertedData),
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf8',
        }),
      })
        .then((response) => console.log('SUCCESS:', JSON.stringify(response)))
        .catch((error) => console.error('Error: ', error));
    }, 1000);
  }

  componentDidMount() {
    fetch(`/api/v1/posts/${this.state.id}`)
      .then((response) => response.json())
      .then((data) => {
        let { content } = data;
        content = JSON.parse(content);
        if (content) {
          this.setState({ editorState: EditorState.createWithContent(convertFromRaw(content)) });
        } else {
          this.setState({ editorState: EditorState.createEmpty() });
        }
      });
    console.log(this.state.id);
  }

  onTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  _onToggleCode() {
    this.onChange(RichUtils.toggleCode(this.state.editorState));
  }
  render() {
    const styles = this.state.styles;

    if (!this.state.editorState) {
      return (
                <h3 className="loading">
                    Loading...
                </h3>
      );
    }
    return (
      <div style={styles.notePageBox}>
        <h3>Text Area</h3>
        {/* <div>
          <label for="inp" class="inp">
            <input type="text" id="inp" placeholder="Enter your title" pattern=".{6,}" required value={this.state.title} onChange={this.handleChange} />
            <svg width="280px" height="18px" viewBox="0 0 280 18" class="border" margin="10px">
              <path d="M0,12 L223.166144,12 C217.241379,12 217.899687,12 225.141066,12 C236.003135,12 241.9279,12 249.827586,12 C257.727273,12 264.639498,12 274.514107,12 C281.097179,12 281.755486,12 276.489028,12"></path>
            </svg>
          </label>
        </div> */}
        <TextField required id="standard-required" defaultValue="" onChange={this.onTitleChange} placeholder="Title"/>
        <p></p>
        <div >
          <button onClick={this._onBoldClick.bind(this)}>Bold</button>
          <button onClick={this._onToggleCode.bind(this)}>Code Block</button>
          <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand.bind(this)}
          />
        </div>
      </div>
    );
  }
}
export default NotePage;
// ReactDOM.render(<NotePage />, document.getElementById('root'));
