import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'; //alerts that this comp will be accessed by router and has access to router props

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

    async handleUserName(name: string, text: string) {
        // let name = this.props.match.params.name
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
            // let a = this.state.userid;
            // console.log('mathId: ', this.math(a))
            await fetch('/api/chirps/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json"
                },
            });
            this.props.history.push('/');
            console.log('fired')
        }
    };

    math(a: number) {
        return a * 2
    };


    // async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    //     this.handleUserName();
    //     const data = { name: this.state.name, text: this.state.text, id: this.state.id, userid: this.state.userid }
    //     e.preventDefault();

    //     console.log(data, 'add chirp');  ///remove
    //     if (this.state.name && this.state.text) {
    //         try {

    //             await fetch('/api/chirps/', {
    //                 method: 'POST',
    //                 body: JSON.stringify(data),
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //             });
    //             this.props.history.push('/')
    //         } catch (err) {
    //             console.log(err, 'AddChirp Error')
    //         }
    //     } else {
    //         alert('Need name and text')
    //     }
    // }

    // async handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    //     let name = this.props.match.params.name;
    //     const data = { name: this.state.name, text: this.state.text, id: this.state.id, userid: this.state.userid }
    //     e.preventDefault();
    //     try {
    //         try {
    //             let r = await fetch(`/api/users/${name}`);
    //             let userid = await r.json();
    //             this.setState(userid);
    //             console.log(userid, 'userid')
    //         } catch (err) {
    //             console.log(err, 'here')
    //         }
    //         finally {
    //             await fetch('/api/chirps/', {
    //                 method: 'POST',
    //                 body: JSON.stringify(data),
    //                 headers: {
    //                     "Content-type": "application/json"
    //                 },
    //             });
    //             this.props.history.push('/')
    //         }

    //     } catch (err) {
    //         console.log(err, 'there')
    //     }
    // }




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