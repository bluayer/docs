import '../webapp/css/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import MainPage from './MainPage.jsx';
import Page1Page from './Page1Page.jsx';

class AppPage extends React.Component {
    render() {
        return (
            <div>
                <h2>HIHI</h2>
                <BrowserRouter>
                    <Route path="/" component={MainPage}/>
                    <Route path="/" component={Page1Page}/>
                </BrowserRouter>
            </div>
        );
    }
}

ReactDOM.render(<AppPage />, document.getElementById('root'));