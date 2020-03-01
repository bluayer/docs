import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import debounce from 'lodash/debounce';

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };
    }
    
    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        // console.log(convertToRaw(contentState));
        this.setState({
            editorState,
        });
    }

    saveContent = debounce((content) => {
        const draftId = 1
        const convertedData = {
            title: "TEST",
            // author: "testUser",
            content: JSON.stringify(convertToRaw(content))
        };
        // console.log("CONVERtedData",JSON.stringify(convertedData));
        fetch('/api/v1/posts/1', {
            method: 'PUT',
            body: JSON.stringify(convertedData),
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf8'
            })
        })
        .then(response => console.log('SUCCESS:', JSON.stringify(response)))
        .catch(error => console.error('Error: ', error))

    }, 1000);    

    componentDidMount() {
        fetch('/api/v1/posts/1')
        .then(response => response.json())
        .then(data => {
            let { content } = data;
            content = JSON.parse(content);
            if (content) {
                this.setState({ editorState: EditorState.createWithContent(convertFromRaw(content)) })
            } else {
                this.setState({ editorState: EditorState.createEmpty() });
            }
        });
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    
    render() {
        if (!this.state.editorState) {
            return (
                <h3 className="loading">Loading...</h3>
            );
        }
        return (
            <>
                <h3>Text Area</h3>
                <div style={{ border: '2px solid black' }}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                    />
                </div>
            </>
        );
    }
    
}
export default MainPage;
// ReactDOM.render(<MainPage />, document.getElementById('root'));