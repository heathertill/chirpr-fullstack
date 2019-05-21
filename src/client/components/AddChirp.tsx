import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'; //alerts that this comp will be accessed by router and has access to router props
import { timingSafeEqual } from 'crypto';

export interface AddChirpProps extends RouteComponentProps<{ name: string }> { }

export interface AddChirpState {
    name: string;
    text: string;
    id: number;
    userid: number
}

class AddChirp extends React.Component<AddChirpProps, AddChirpState> {
    constructor(props: AddChirpProps) {
        super(props);
        this.state = {
            name: '',
            text: '',
            id: null,
            userid: null
        }
        this.handleUserName = this.handleUserName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        // this.handleUserName();
        console.log('name:', this.state.name, 'userid:', this.state.userid);
        let name = this.state.name;
        let text = this.state.text;
        return (
            this.handleUserName(name, text)
        );
    }

    async checkMention(str: string) {
        let mention = str.includes('@')
        if (mention === true) {
            console.log('true');
            try {
                let data = { userid: this.state.userid, id: this.state.id }
                await fetch('api/mentions/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    },
                });
                // this.props.history.push('/');
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log('false')
        }
    };

    async handleUserName(name: string, text: string) {
        try {
            let r = await fetch(`/api/users/${name}`);
            let userid = await r.json();
            this.setState(userid);
            console.log('userid:',userid, 'name:', name, 'text:', text)
        } catch (err) {
            console.log(err);
        }
        finally {
            let data = { userid: this.state.userid, text: this.state.text }
            await fetch('/api/chirps/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                },
            });
            this.props.history.push('/');
            this.checkMention(text);
            console.log('fired')
        }
    };


    render() {
        return (
            <div className="chirpInput card col-md-8 border p-3 mt-3">
                <div className="card-body">
                    <form className="form-group mb-0 p-3">
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