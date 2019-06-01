import * as React from 'react';
import { Link } from 'react-router-dom';

export interface NavBarProps { }

const NavBar: React.SFC<NavBarProps> = () => {
    return (
        <>
            <div className="sticky-top bg-white">
                <nav className="nav justify-content-center">
                    <Link className="nav-link text-secondary mx-2 my-1" to="/add">Add Chirp</Link>
                    <Link className="nav-link text-secondary mx-2 my-1" to="/">All Chirps</Link>
                    <Link className="nav-link text-secondary mx-2 my-1" to="/mentions">Mentions</Link>
                </nav>
                <div className="row justify-content-md-center">
                    <div className="header col-md-12 p-2">
                        <p className="text-center m-2 mt-4">Chirper</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavBar;


