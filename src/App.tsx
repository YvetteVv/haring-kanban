import React from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Login} from "./page/login";
import {Home} from "./page/home";
import {store} from "./redux/store";
import {Register} from "./page/register";
import {CandidateCreate} from "./page/candidate-create";
import {CandidateReview} from "./page/candidate-edit";

export const App = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route
                        path="/home"
                        exact
                        component={(routeProps) => <Home {...routeProps} />}
                    />
                    <Route
                        path="/login"
                        exact
                        component={(routeProps) => <Login {...routeProps} />}
                    />
                    <Route
                        path="/register"
                        exact
                        component={(routeProps) => <Register {...routeProps} />}
                    />
                    <Route
                        path="/candidates"
                        exact
                        component={(routeProps) => <CandidateCreate {...routeProps} />}
                    />
                    <Route
                        path="/candidate/:id"
                        exact
                        component={(routeProps) => <CandidateReview {...routeProps} />}
                    />
                    <Redirect to="/home"/>
                </Switch>
            </HashRouter>
        </Provider>
    );
};

