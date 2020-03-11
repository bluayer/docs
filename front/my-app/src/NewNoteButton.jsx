/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class NewNoteButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.UNSAFE_componentWillReceivePropspropTypes = {
      match: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    };
  }

  onClickHandler() {
    const contentState = this.state;
    const currentContent = contentState.editorState.getCurrentContent();
    const convertedData = {
      title: '',
      // author: "testUser",
      content: JSON.stringify(convertToRaw(currentContent)),
    };
    fetch('/api/v1/posts', {
      method: 'POST',
      body: JSON.stringify(convertedData),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf8',
      }),
    })
      .then(response => {
        console.log('SUCCESS:', response);
        return response.json();
      })
      .then(data => {
        console.log('data is >>>> ', data);
        this.props.history.push(`/page/${data}`);
      })
      .catch(error => console.error('Error: ', error));
  }

  render() {
    return (
      <Button variant="outlined" onClick={this.onClickHandler}>
        Add Note
      </Button>
    );
  }
}
const ShowTheLocationWithRouter = withRouter(NewNoteButton);
export default ShowTheLocationWithRouter;
