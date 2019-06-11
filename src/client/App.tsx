import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import AllChirps from './components/AllChirps';
import AddChirp from './components/AddChirp';
import Admin from './components/Admin';
import Mentions from './components/Mentions';

import './scss/app';

export interface AppProps { }

const App: React.SFC<AppProps> = () => {
    return (
        // wraping entire app in the router allows for this.props.history, location, match..
        <Router> 
            <main className="container-fluid p-0">
                <Navbar />
                <section className="container">
                    <div className="row justify-content-md-center">
                        <Switch>
                            <Route exact path="/" component={AllChirps} />
                            <Route exact path="/add" component={AddChirp} />
                            <Route exact path="/:id/admin" component={Admin} />
                            <Route exact path="/mentions" component={Mentions} />
                        </Switch>
                    </div>
                </section>
            </main>
        </Router>
    );
}

export default App;