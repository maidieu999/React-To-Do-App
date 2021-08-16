import React, { Component } from 'react';
import Menu from './components/Menu/Menu';
import routes from './routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// 1.	npm install redux react-redux react-router-dom --save

class App extends Component {
    showContent = (routes) => {
        var result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                    key={index}
                />
            })
        }
        return result;
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Menu />

                    <div className="container">
                        <div className="row">
                            <Switch>{this.showContent(routes)}</Switch>

                        </div>
                    </div>
                </React.Fragment>
            </Router>
        )
    }


}

export default App;
