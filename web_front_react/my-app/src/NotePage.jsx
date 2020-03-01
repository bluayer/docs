import React from 'react';
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js';
import debounce from 'lodash/debounce';

class NotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            editorState: EditorState.createEmpty()
        };
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
        const convertedData = {
            title: "TEST",
            // author: "testUser",
            content: JSON.stringify(convertToRaw(content))
        };
        // console.log("CONVERtedData",JSON.stringify(convertedData));
        fetch('/api/v1/posts/'+this.state.id, {
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
        fetch('/api/v1/posts/'+this.state.id)
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
        console.log(this.state.id);
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
export default NotePage;
// ReactDOM.render(<NotePage />, document.getElementById('root'));