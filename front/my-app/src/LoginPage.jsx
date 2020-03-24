import React from 'react';
import Button from '@material-ui/core/Button';
import { BrowserRouter, Route } from 'react-router-dom';
import AppPage from './AppPage';

function LoginPage() {
  return (
    <>
      {/* <a className="btn btn-block social-btn google" href="">
        
      </a> */}
      <BrowserRouter>
        <Route exact path="/">
          <Button
            variant="contained"
            color="white"
            href="http://localhost:8080/api/v1/posts"
          >
            Log in with Google
          </Button>
        </Route>
        <AppPage />
      </BrowserRouter>
    </>
  );
}

export default LoginPage;
