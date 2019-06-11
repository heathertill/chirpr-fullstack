import * as React from 'react';
import { Link } from 'react-router-dom';
import ChirpCard from './ChirpCard';

export interface AllChirpsProps { }

export interface AllChirpsState {
    chirps: { id: number, name: string, text: string }[];
}

class AllChirps extends React.Component<AllChirpsProps, AllChirpsState> {
    constructor(props: AllChirpsProps) {
        super(props);
        this.state = {
            chirps: [],
        };
    }

    async componentWillMount() {
        let res = await fetch('/api/chirps');
        let chirps = await res.json();
        this.setState({ chirps })
    };

    render() {
        return (
            <>
                <div className="col-md-9">
                    {this.state.chirps.map(chirp => {
                        return <ChirpCard key={chirp.id} chirp={ chirp } />
                    })}
                </div>
            </>
        );
    }
}

export default AllChirps;