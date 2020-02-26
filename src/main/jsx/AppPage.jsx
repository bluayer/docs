import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router, Link } from 'react-router-dom';
import MainPage from './MainPage.jsx';
import Page1Page from './Page1Page.jsx';

class AppPage extends React.Component {
    render() {
        return (
            <div>
                <h2>HIHI</h2>
                <BrowserRouter>
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