import React from 'react';
import { EditorState, convertToRaw, convertFromRaw, } from 'draft-js';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './NotePage.css';
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
        textField: {
          fontWeight: "bold",
        }
      }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    // this.saveContent = this.saveContent.bind(this);
  }

  // onChange(editorState) {
  //   const contentState = editorState.getCurrentContent();
  //   this.saveContent(contentState);
  //   // console.log(convertToRaw(contentState));
  //   this.setState({
  //     editorState,
  //   });
  // }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    const contentState = this.state.editorState.getCurrentContent();
    this.saveContent(contentState);
    console.log(JSON.stringify(convertToRaw(contentState)));
  };
  saveContent = debounce((content) => {
      console.log("HIHI")
      const convertedData = {
        title: this.state.title,
        // author: "testUser",
        content: JSON.stringify(convertToRaw(content)),
      };
      console.log("CONVERtedData",JSON.stringify(convertedData));
      fetch(`/api/v1/posts/${this.state.id}`, {
        method: 'PUT',
        body: JSON.stringify(convertedData),
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf8',
        }),
      }).then((response) => console.log('SUCCESS:', JSON.stringify(response)))
        .catch((error) => console.error('Error: ', error));
    }, 1000);

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
    //TODO: TITLE UPDATE
  }

  onTitleChange(event) {
    this.setState({title: event.target.value});
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
        {/* <h3>Text Area</h3> */}
        <TextField required id="standard-required" defaultValue="" onChange={this.onTitleChange} placeholder="Title"/>
        <p></p>
        <div >
          <Editor
            class="demo-editor"
            editorState={this.state.editorState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
          />

        </div>
      </div>
    );
  }
}
export default NotePage;
// ReactDOM.render(<NotePage />, document.getElementById('root'));
