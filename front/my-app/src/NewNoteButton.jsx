import React from 'react';
import {
  EditorState, convertToRaw,
} from 'draft-js';
import Button from '@material-ui/core/Button';

class NewNoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  onClickHandler() {
    const contentState = this.state.editorState.getCurrentContent();
    const convertedData = {
      title: 'TEST',
      // author: "testUser",
      content: JSON.stringify(convertToRaw(contentState)),
    };
    fetch('/api/v1/posts', {
      method: 'POST',
      body: JSON.stringify(convertedData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf8',
      }),
    })
      .then((response) => {
        console.log('SUCCESS:', response);
        return response.json();
      })
      .then((data) => {
        console.log('data is >>>> ', data);
      })
      .catch((error) => console.error('Error: ', error));
    // TODO: get noteId from POST response
    // route to local/main/{id}
  }

  render() {
    return (
            <Button variant="outlined" onClick={this.onClickHandler}>
                Add Note
            </Button>
    );
  }
}
export default NewNoteButton;
