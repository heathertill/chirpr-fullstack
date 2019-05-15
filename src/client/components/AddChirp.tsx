import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'; //alerts that this comp will be accessed by router and has access to router props

export interface AddChirpProps extends RouteComponentProps { }

export interface AddChirpState {
    user: string;
    text: string
}

class AddChirp extends React.Component<AddChirpProps, AddChirpState> {
    constructor(props: AddChirpProps) {
        super(props);
        this.state = {
            user: '',
            text: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        const data = { user: this.state.user, text: this.state.text }
        e.preventDefault();
        console.log(data);  ///remove
        if (this.state.user && this.state.text) {
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
                console.log(err)
            }
        } else {
            alert('Need user and text')
        }
    }

    render() {
        return (
            <div className="chirpInput card col-md-8 border p-3 mt-3">
                <div className="card-body">
                    <form
                        className="form-group mb-0 p-3">
                        <label htmlFor="user">Name</label>
                        <input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ user: e.target.value })}
                            type="text" className="form-control" value={this.state.user} />
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