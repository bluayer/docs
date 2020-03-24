/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import NotePage from './NotePage.jsx';
import NewNoteButton from './NewNoteButton.jsx';

function NoNoteOnServer(props) {
  const { noteList } = props;
  // console.log(noteList);
  // console.log(noteList.length == 0);
  if (noteList.length === 0) {
    return <h2>Now there is NOte</h2>;
  }
  return <br />;
}

const ListItemLink = props => {
  const { url, title } = props;
  return (
    <>
      <Link to={url}>
        <ListItem button>
          <ListItemText primary={title} />
        </ListItem>
      </Link>
      <Divider />
    </>
  );
};

class AppPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        list: {
          width: 600,
          margin: 'auto',
          // border: '1px solid #efefef',
          fontSize: '12px',
        },
        homePageBox: {
          margin: 'auto',
          marginTop: 100,
          width: 800,
          font: 'sans-serif',
        },
        button: {
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: 50,
        },
      },
      noteList: [],
    };
  }

  componentDidMount() {
    if (!this.test) {
      fetch('/api/v1/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res =>
        res.json().then(json => {
          console.log(json);
          this.setState({ noteList: json });
        }),
      );
    }
    // console.log(this.state.noteList);
  }

  render() {
    const { styles, noteList } = this.state;
    return (
      <>
        <BrowserRouter>
          <Route path="/home">
            <div style={styles.homePageBox}>
              <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                Mini Docs
              </h2>
              <div style={styles.button}>
                <NewNoteButton />
              </div>
              <div style={styles.list}>
                <NoNoteOnServer noteList={noteList} />
                <List component="nav" aria-label="main mailbox folders">
                  {noteList.map((note, i) => {
                    const url = `/page/${note.id}`;
                    return (
                      <ListItemLink url={url} title={note.title} key={i} />
                    );
                  })}
                </List>
              </div>
            </div>
          </Route>
          <Route path="/page/:id" component={NotePage} />
        </BrowserRouter>
      </>
    );
  }
}

export default AppPage;
