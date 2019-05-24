import * as React from 'react';
import ChirpCard from './ChirpCard'

export interface MentionsProps {

}

export interface MentionsState {
    users: { name: string, id: number }[];
    chirps: { id: number, name: string, text: string }[];
}

class Mentions extends React.Component<MentionsProps, MentionsState> {
    constructor(props: MentionsProps) {
        super(props);
        this.state = {
            users: [],
            chirps: []
        };
    }

    async componentWillMount() {
        let res = await fetch('/api/users');
        let users = await res.json();
        console.log(users);
        this.setState({ users })
    };

    renderUsers() {
        return this.state.users.map(user => {
            return <option key={user.id}>{user.name}</option>
        })
    };

    async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let res = await fetch('/api/chirps');
        let chirps = await res.json();
        console.log(chirps);
        chirps.pop();
        this.setState({ chirps })
        
}



    render() {
        return (
            <>
                <div className="card col-md-12 m-4 p-5">
                    <div className="card-body p-0">
                        <div className="card-title">Show Mentions for ...</div>
                        <select className="form-control text-secondary">
                            <option >List of User Names</option>
                            {this.renderUsers()}
                        </select>
                        <div className="text-right">
                            <button className="btn btn-primary btn-outline-light mt-5"
                            // onClick={this.handleSubmit}
                            >Get Mentions</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    {this.state.chirps.map(chirp => {
                        return <ChirpCard key={chirp.id} chirp={ chirp } />
                    })}
                </div>
            </>
        );
    }
}

export default Mentions;