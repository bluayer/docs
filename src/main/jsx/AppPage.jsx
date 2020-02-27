import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter, Route, Router, Link } from 'react-router-dom';
import MainPage from './MainPage.jsx';
import Page1Page from './Page1Page.jsx';

class AppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { useStyles: makeStyles(theme => ({
            root: {
              width: '100%',
              maxWidth: 360,
              backgroundColor: theme.palette.background.paper,
            },})),
            noteList : ""};
    }

    componentDidMount(){
        fetch('/api/v1/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json()
            .then(json => {
                console.log(json);
                this.state.noteList = json;
            }));
        // console.log(this.state.noteList)
    }



    render() {
        const classes = this.state.useStyles;

        const ListItemLink = (props) => {
            const url = "/page"+props.id;
            return (
                // <ListItem button component="a" {...props} />
                <Link to={url}>
                    <ListItem button>
                        <ListItemText primary={props.title} />
                    </ListItem>
                </Link>
            );
        }

        return (
            <div>
                <h2>HIHI</h2>
                <BrowserRouter>
                <List component="nav" aria-label="main mailbox folders">
                    <Link to="/home">
                        <ListItem button>
                            <ListItemText primary="Home" />
                        </ListItem>
                    </Link>
                    <ListItem button>
                        <ListItemText primary="Drafts" />
                    </ListItem>
                </List>
                <Divider />


                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/page">Page</Link>
                    </li>
                    <Route path="/home" component={MainPage}/>
                    <Route path="/page" component={Page1Page}/>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(<AppPage />, document.getElementById('root'));