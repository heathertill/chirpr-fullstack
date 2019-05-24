import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'; //alerts that this comp will be accessed by router and has access to router props


export interface AddChirpProps extends RouteComponentProps<{ name: string }> { }

export interface AddChirpState {
    name: string;
    text: string;
    id: number;
    userid: number;
    users: { name: string, id: number }[];
}

class AddChirp extends React.Component<AddChirpProps, AddChirpState> {
    constructor(props: AddChirpProps) {
        super(props);
        this.state = {
            name: '',
            text: '',
            id: null,
            userid: null,
            users: []
        }
        this.handleUserName = this.handleUserName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentWillMount() {
        let res = await fetch('/api/users');
        let users = await res.json();
        console.log(users);
        this.setState({ users })
    };

    handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log('handlesubmit', 'name:', this.state.name, 'userid:', this.state.userid, 'id:', this.state.id, 'users:', this.state.users);
        let name = this.state.name;
        let text = this.state.text;
        return (
            this.handleUserName(name, text)
        );
    }


    // async checkMention(str: string) {
    //     let mention = str.includes('@')
    //     if (mention === true) {
    //         console.log('true');
    //         try {
    //             let data = { userid: this.state.userid, id: this.state.id }
    //             await fetch('api/mentions/', {
    //                 method: 'POST',
    //                 body: JSON.stringify(data),
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //             });
    //             // this.props.history.push('/');
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     } else {
    //         console.log('false')
    //     }
    // };

    async checkMention(text: string) {
        let mention = text.includes('@')
        if (mention === true) {
            console.log('check mention true');
        } else {
            console.log('check mention false')
        }
    };

    async handleUserName(name: string, text: string) {
        if (this.state.name && this.state.text) {
            try {
                let r = await fetch(`/api/users/${name}`);
                let userid = await r.json();
                this.setState(userid[0]);
                console.log('hun step 1', 'userid:', userid, 'name:', name, 'text:', text)
            } catch (err) {
                console.log('hun step 2', err);
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
                console.log('hun step 3 fired')
            }
        } else {
            alert('need name and text')
        }
    };

    renderUsers() {
        return this.state.users.map(user => {
            return <option key={user.id}>{user.name}</option>
        })
    }

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
                        <div className="d-flex justify-content-between m-3">
                            <div>
                            <select className="form-control text-secondary">
                                <option >List of User Names</option>
                                {this.renderUsers()}
                            </select>
                            </div>
                            <div>
                            <button className="btn btn-primary btn-outline-light"
                                onClick={this.handleSubmit}
                            >Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddChirp;