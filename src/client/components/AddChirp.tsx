import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'; //alerts that this comp will be accessed by router and has access to router props

export interface AddChirpProps extends RouteComponentProps<{ name: string }> { }

export interface AddChirpState {
    name: string;
    text: string;
    id: number;
    userid: string
}

class AddChirp extends React.Component<AddChirpProps, AddChirpState> {
    constructor(props: AddChirpProps) {
        super(props);
        this.state = {
            name: '',
            text: '',
            id: null,
            userid: ''
        }
        this.handleUserName = this.handleUserName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleUserName() {
        let name = this.props.match.params.name
        try {
            let r = await fetch(`/api/users/${name}`);
            let userid = await r.json();
            this.setState(userid);
            console.log(userid, 'userid')
        } catch (err) {
            console.log(err);
        }
    }

    handleName() {
        this.handleUserName();
    }


    async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        this.handleUserName();
        const data = { name: this.state.name, text: this.state.text, id: this.state.id, userid: this.state.userid }
        e.preventDefault();

        console.log(data, 'add chirp');  ///remove
        if (this.state.name && this.state.text) {
            try {

                await fetch('/api/chirps/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    },
                });
               
                this.props.history.push('/')
            } catch (err) {
                console.log(err, 'AddChirp Error')
            }
        } else {
            alert('Need name and text')
        }
    }

    render() {
        return (
            <div className="chirpInput card col-md-8 border p-3 mt-3">
                <div className="card-body">
                    <form
                        className="form-group mb-0 p-3">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ name: e.target.value })}
                            type="text" className="form-control" value={this.state.name} />
                        <label className="mt-3" htmlFor="text">Text</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: e.target.value })}
                            type="text" className="form-control" value={this.state.text} />
                        <div className="text-right pt-3">
                            <button className="btn btn-blueCh btn-outline-light text-right"
                                onClick={this.handleSubmit}
                            >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddChirp;