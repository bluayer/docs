import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MainPage from './NotePage.jsx';
import NewNoteButton from './NewNoteButton.jsx';

class ListItemLink extends React.Component{
    render(){
        return(
            <>
                <Link to={this.props.url}>
                    <ListItem button>
                        <ListItemText primary={this.props.title} />
                    </ListItem>
                </Link>
                <Divider />
            </>
        )}
}

class AppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useStyles: makeStyles(theme => ({
                root: {
                    width: '100%',
                    maxWidth: 360,
                    backgroundColor: theme.palette.background.paper,
                },
            })),
            styles: {
                list: {
                    width: 600,
                    margin: 'auto',
                    // border: '1px solid #efefef',
                    fontSize: '12px'
                },
                homePageBox: {
                    margin: 'auto',
                    marginTop: 100,
                    width: 800,
                    font: "sans-serif",
                },
                button: {
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginRight: 50,
                },
            },
            noteList : [{"id":1,"title":"hola","content":"hihi","author":"hi"}, {"id":2, "title": "CJNM", "content": "We are couple.", "author": "HJ"}],
            test : true
        };
    }

    componentDidMount(){
        if (!this.test){
            fetch('/api/v1/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => res.json()
                .then(json => {
                    console.log(json);
                    this.setState({noteList: json});
                })
            );
            console.log("This is not test");
        }
        console.log(this.state.noteList)
    }

    render() {
        const styles = this.state.styles;
        return (
            <>
                <BrowserRouter>
                    <Route path="/home">
                        <div style={styles.homePageBox}>
                            <h2 style={{ display: 'flex', justifyContent: 'center' }}>Mini Docs</h2>
                            <div style={styles.button}>
                                <NewNoteButton />
                            </div>
                            <div style={styles.list}>
                                <List component="nav" aria-label="main mailbox folders" >
                                    {this.state.noteList.map((note,i)=>{
                                        const url = '/page/'+note.id;
                                        return (<ListItemLink url={url} 
                                                            title={note.title}
                                                            key={i}/>)
                                    })}
                                </List>
                            </div>
                        </div> 
                    </Route>
                    <Route path="/page/:id" component={MainPage} />
                </BrowserRouter>
            </>
        );
    }
}

export default AppPage;
