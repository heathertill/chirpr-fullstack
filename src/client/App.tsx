import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import AllChirps from './components/AllChirps';
import AddChirp from './components/AddChirp';
import Admin from './components/Admin';

import './scss/app';

export interface AppProps { }

const App: React.SFC<AppProps> = () => {
    return (
        <Router>
            <main className="container-fluid">
                <Navbar />
                <section className="container">
                    <div className="row justify-content-md-center">
                        <Switch>
                            <Route exact path="/" component={AllChirps} />
                            <Route exact path="/add" component={AddChirp} />
                            <Route exact path="/:id/admin" component={Admin} />
                        </Switch>
                    </div>
                </section>
            </main>
        </Router>
    );
}

export default App;