import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import Button from '@material-ui/core/Button';

class Page1Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
    }
    
    onClickHandler = () => {
        const contentState = this.state.editorState.getCurrentContent();
        const convertedData = {
            title: "TEST",
            // author: "testUser",
            content: JSON.stringify(convertToRaw(contentState))
        };
        fetch('/api/v1/posts', {
            method: 'POST',
            body: JSON.stringify(convertedData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf8'
            })
        })
        .then(response => console.log('SUCCESS:', response))
        .catch(error => console.error('Error: ', error))
        // TODO: get noteId from POST response
        // route to local/main/{id}
    }

    render() {
        return(
        <Button variant="contained" color="primary" onClick={this.onClickHandler}>
            Add Note
        </Button>
        );
    }

}
export default Page1Page