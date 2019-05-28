import * as React from 'react';
import ChirpCard from './ChirpCard'

export interface MentionsProps {

}

export interface MentionsState {
    users: { name: string, id: number }[];
    chirps: { id: number, name: string, text: string, _created: Date }[];
    selectedUserId: string;
    mentioner: string;
}

class Mentions extends React.Component<MentionsProps, MentionsState> {
    constructor(props: MentionsProps) {
        super(props);
        this.state = {
            users: [],
            chirps: [],
            selectedUserId: "",
            mentioner: ""
        };
        this.handleSelectedUserChange = this.handleSelectedUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillMount() {
        let res = await fetch('/api/users');
        let users = await res.json();
        console.log('users:', users);
        this.setState({ users })
    };

    renderUsers() {
        return this.state.users.map(user => {
            return <option value={user.id}>{user.name}</option>
        })
    };

    handleSelectedUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedUserId: e.target.value });
    };

    // handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    //     console.log('selectedUserId1:', this.state.selectedUserId)
    // }

    // async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    //     let id = this.state.selectedUserId
    //     e.preventDefault();
    //     let res = await fetch(`/api/mentions/${id}`);
    //     let chirps = await res.json();
    //     console.log(chirps);
    //     chirps.pop();
    //     this.setState({ chirps })
    // }

    async handleSubmit() {
        let id = this.state.selectedUserId
        try {
            let r = await fetch(`/api/name/${id}`);
            let mentioner = await r.json();
            this.setState(mentioner);
            console.log('selectedUserId1:', this.state.selectedUserId)
            console.log('menHun step 1', 'mentioner:', mentioner)
        } catch (err) {
            console.log('menHun step 2', err);
        }
        finally {
            let res = await fetch(`/api/mentions/${id}`);
            let chirps = await res.json();
            console.log(chirps);
            chirps.pop();
            this.setState({ chirps })
            console.log('menHun step 3 fired')
        }
    };

    render() {
        return (
            <>
                <div className="card col-md-12 m-4 p-5">
                    <div className="card-body p-0">
                        <div className="card-title">Show Mentions for ...</div>
                        <select value={this.state.selectedUserId}
                            onChange={this.handleSelectedUserChange}
                            className="form-control text-secondary">
                            <option >List of User Names</option>
                            {this.renderUsers()}
                        </select>
                        <div className="text-right">
                            <button className="btn btn-primary btn-outline-light mt-5"
                                onClick={this.handleSubmit}
                            >Get Mentions</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    {this.state.chirps.map(chirp => {
                        return <ChirpCard key={chirp.id} chirp={chirp} />
                    })}
                </div>
            </>
        );
    }
}

export default Mentions;