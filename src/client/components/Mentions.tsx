import * as React from 'react';

export interface MentionsProps { }

export interface MentionsState {
    users: { name: string, id: number }[];
    chirps: { id: number, userid: number, text: string, _created: Date }[];
    selectedUserId: any;
    mentions: { id: number }[];
}

class Mentions extends React.Component<MentionsProps, MentionsState> {
    constructor(props: MentionsProps) {
        super(props);
        this.state = {
            users: [],
            chirps: [],
            selectedUserId: "",
            mentions: [],
        };
        this.handleSelectedUserChange = this.handleSelectedUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentWillMount() {
        let res = await fetch('/api/users');
        let users = await res.json();
        this.setState({ users })
    };

    renderUsers() {
        return this.state.users.map(user => {
            return <option key={user.id} value={user.id}>{user.name}</option>
        })
    };

    async handleSelectedUserChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedUserId: e.target.value });
    };

    async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        let id = this.state.selectedUserId;
        try {
            e.preventDefault();
            let res = await fetch(`/api/mentions/${id}`);
            let chirps = await res.json();
            this.setState({ chirps });
        } catch (err) {
            console.log(err)
        }
    };

    render() {
        return (
            <>
                <div className="card col-md-9 m-4 p-5">
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
                <div className="col-md-9 p-0">
                    {this.state.chirps.map(chirp => {
                        return (
                            <div key={chirp.id} className="card mb-4 p-5 shadow-lg">
                                <div className="card-header">User: {chirp.userid}</div>
                                <div className="card-body">
                                    <h5>Chirped:</h5>
                                    <h4 className="card-title">{chirp.text}</h4>
                                    <p>On: {chirp._created}</p>
                                    {/* {this.chirpName(chirp.userid)} */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        );
    }
}

export default Mentions;


