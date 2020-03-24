/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import debounce from 'lodash/debounce';
import TextField from '@material-ui/core/TextField';
import { Editor } from 'react-draft-wysiwyg';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './NotePage.css';
// import './NotePage.css';

class NotePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      title: '',
      editorState: EditorState.createEmpty(),
      styles: {
        notePageBox: {
          margin: 'auto',
          marginTop: 100,
          width: 800,
          font: 'sans-serif',
        },
        textField: {
          fontWeight: 'bold',
        },
      },
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.pushToHome = this.pushToHome.bind(this);
    // this.onUnload = this.onUnload.bind(this);
    this.deleteThisNote = this.deleteThisNote.bind(this);
    this.saveContent = debounce(content => {
      // console.log('HIHI');
      const convertedData = {
        title: this.state.title,
        // author: "testUser",
        content: JSON.stringify(convertToRaw(content)),
      };
      // console.log('CONVERtedData', JSON.stringify(convertedData));
      fetch(`/api/v1/posts/${this.state.id}`, {
        method: 'PUT',
        body: JSON.stringify(convertedData),
        headers: new Headers({
          'Content-Type': 'application/json; charset=utf8',
        }),
      })
        .then(response => console.log('SUCCESS:', JSON.stringify(response)))
        .catch(error => console.error('Error: ', error));
    }, 1000);
  }

  componentDidMount() {
    // window.addEventListener('beforeunload', this.onUnload);
    fetch(`/api/v1/posts/${this.state.id}`)
      .then(response => response.json())
      .then(data => {
        // const { what } = data;
        let { content } = data;
        const { title } = data;
        content = JSON.parse(content);
        // console.log(title);
        if (content) {
          this.setState({
            editorState: EditorState.createWithContent(convertFromRaw(content)),
          });
          this.setState({ title });
          // console.log(this.state.title);
        } else {
          this.setState({ editorState: EditorState.createEmpty() });
        }
      });
    // console.log(this.state.id);
    // TODO: TITLE UPDATE
  }

  // componentWillUnmount() {
  //   window.removeEventListener('beforeunload', this.onUnload);
  // }

  onEditorStateChange(editorState) {
    // console.log('onEditorStateChange');
    this.setState({
      editorState,
    });
    const contentState = this.state.editorState.getCurrentContent();
    this.saveContent(contentState);
    // console.log(JSON.stringify(convertToRaw(contentState)));
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
    console.log(event.target.value);
    const contentState = this.state.editorState.getCurrentContent();
    this.saveContent(contentState);
  }

  // onUnload(e) {
  //   // the method that will be used for both add and remove event
  //   if (this.state.title === '') {
  //     e.preventDefault();
  //     e.returnValue = '';
  //     console.log(e.returnValue);
  //   }
  // }

  pushToHome() {
    this.props.history.push('/home');
    window.location.reload();
  }

  deleteThisNote() {
    fetch(`/api/v1/posts/${this.state.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf8',
      }),
    }).then(() => this.pushToHome());
  }

  render() {
    const { styles } = this.state;
    // console.log('!!!!');
    // console.log(this.state.title);
    if (!this.state.editorState) {
      return <h3 className="loading">Loading...</h3>;
    }
    return (
      <div style={styles.notePageBox}>
        <Button
          onClick={() => {
            if (this.state.title === '') {
              if (
                window.confirm(
                  'The Note without title will be deleted.\nAre you sure you wish to delete this Note?',
                )
              )
                this.deleteThisNote();
            } else {
              this.pushToHome();
            }
          }}
        >
          Home
        </Button>
        <Button
          onClick={() => {
            if (window.confirm('Are you sure you wish to delete this Note?'))
              this.deleteThisNote();
          }}
        >
          Delete
        </Button>
        <div>
          {/* <h3>Text Area</h3> */}
          <TextField
            required
            id="standard-required"
            value={this.state.title}
            onChange={this.onTitleChange}
            placeholder="Title"
          />
          <p />
          <div>
            <Editor
              class="demo-editor"
              editorState={this.state.editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={this.onEditorStateChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

const NotePageWithRouter = withRouter(NotePage);
export default NotePageWithRouter;

// export default NotePage;
// ReactDOM.render(<NotePage />, document.getElementById('root'));
