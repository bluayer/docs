import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = editorState => this.setState({editorState});
    }
    render() {
        return (
            <>
                <h3>Text Area</h3>
                <div style={{ border: '2px solid black' }}>
                    <Editor editorState={this.state.editorState} onChange={this.onChange} />
                </div>
            </>
        );
    }
}

ReactDOM.render(<MainPage />, document.getElementById('root'));