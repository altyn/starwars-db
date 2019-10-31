import React, {Component} from 'react';

import './App.css';
import Header from "../header";
import RandomPlanet from "../random-planet";
import Footer from "../footer";
import ErrorIndicator from "../error-indicator";
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
import TestSwapiService from "../../services/test-swapi-service";

import {
    PeoplePage,
    PlanetPage,
    StarshipPage,
    LoginPage,
    SecretPage} from '../pages'

import {SwapiServiceProvider} from '../swapi-service-context';

import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import {StarshipDetails} from "../sw-components";

export default class App extends Component {

    state = {
        swapiService: new SwapiService(),
        hasError: false,
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        });
    };

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                TestSwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        });
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    };

    render() {

        const {isLoggedIn} = this.state;

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>

                            <Switch>
                                <Route path="/"
                                       render={() => <h2>Welcome to StarDB</h2>}
                                       exact/>
                                <Route path="/people"
                                       component={PeoplePage}
                                       exact/>
                                <Route path="/people/:id"
                                       component={PeoplePage}
                                       exact/>
                                <Route
                                    path="/planets"
                                       component={PlanetPage}/>
                                <Route path="/starships"
                                       component={StarshipPage}
                                       exact/>
                                <Route path="/starships/:id"
                                       render={({match}) => {
                                           const {id} = match.params;
                                           return <StarshipDetails itemId={id}/>
                                       }}/>
                                <Route
                                    path="/login"
                                    render={() => (
                                        <LoginPage
                                            isLoggedIn={isLoggedIn}
                                            onLogin={this.onLogin}/>
                                        )}
                                />
                                <Route
                                    path="/secret"
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn}/>
                                        )}
                                />
                            </Switch>
                            <Route render={() => <h2>Page not Found!</h2>}/>
                            <Footer/>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    };
};