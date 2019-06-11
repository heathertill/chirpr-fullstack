import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'; //alerts that this comp will be accessed by router and has access to router props


export interface AddChirpProps extends RouteComponentProps<{ name: string }> { }

export interface AddChirpState {
    name: string;
    text: string;
    userid: number;
    users: { name: string, id: number }[];
    chirpId: any;
}


class AddChirp extends React.Component<AddChirpProps, AddChirpState> {
    constructor(props: AddChirpProps) {
        super(props);
        this.state = {
            name: '',
            text: '',
            userid: null,
            users: [],
            chirpId: undefined
        }
        this.handleUserName = this.handleUserName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkMention = this.checkMention.bind(this);
    }

    async componentDidMount() {
        let res = await fetch('/api/users');
        let users = await res.json();
        this.setState({ users })
    };

    handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let name = this.state.name;
        let text = this.state.text;
        return (
            this.handleUserName(name, text)
        );
    };

    filterItems(arr: any, query: any) {
        return arr.filter(function (el: any) {
            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        })
    };

    returnName(str: string) {
        let a = str.split(' ');
        let re = /\s*(@)s*/;
        let name = this.filterItems(a, '@').toString().split(re);
        return name[2]
    };

    async checkMention(text: string) {
        let mention = text.includes('@');
        let mentionText = this.state.text;
        let wasMentioned = this.returnName(mentionText);
        if (mention === true) {
            try {
                let r = await fetch(`/api/users/${wasMentioned}`);
                let mentId = await r.json();
                let data = { userid: mentId[0].userid, chirpid: this.state.chirpId }
                await fetch('/api/mentions/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    },
                });
                this.props.history.push('/');
            } catch (err) {
                console.log(err)
            }
            console.log('check mention true');
        } else {
            console.log('check mention false')
        };
    };

    async handleUserName(name: string, text: string) {
        if (this.state.name && this.state.text) {
            try {
                let r = await fetch(`/api/users/${name}`);
                let userid = await r.json();
                console.log('userid', userid)
                this.setState(userid[0]);
                console.log('userid', userid)
            } catch (err) {
                console.log(err);
            }
            finally {
                let data = { userid: this.state.userid, text: this.state.text };
                let res = await fetch('/api/chirps/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-type": "application/json"
                    },
                });
                let info = await res.json();
                this.setState({ chirpId: info.insertId })
                this.props.history.push('/');
                this.checkMention(text);
            }
        } else {
            alert('Please include name and text')
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