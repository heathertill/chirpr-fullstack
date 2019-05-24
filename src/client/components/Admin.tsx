import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface IAdminProps extends RouteComponentProps<{ id: string }> { }

export interface IAdminState {

    chirp: { id: number; name: string; text: string }
}

class Admin extends React.Component<IAdminProps, IAdminState> {
    constructor(props: IAdminProps) {
        super(props);
        this.state = {
            chirp: {
                id: null,
                name: "",
                text: ""
            }
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this)
    }

    async componentDidMount() {
        let id = this.props.match.params.id
        try {
            let resChirp = await fetch(`/api/chirps/${id}`);
            let chirp = await resChirp.json();
            console.log(chirp);
            this.setState({ chirp })
        } catch (err) {
            console.log(err)
        }
    }

    async handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
        let id = this.props.match.params.id
        let data = {
            name: this.state.chirp.name,
            text: this.state.chirp.text
        }
        e.preventDefault();
        try {
            await fetch(`/api/chirps/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            });
            // this.setState({text: this.state.text})
            this.props.history.replace('/');
        } catch (err) {
            console.log(err)
        }
    };

    async handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        let id = this.props.match.params.id
        try {
            await fetch(`/api/chirps/${id}`, {
                method: 'DELETE'
            });
            this.props.history.push('/')
        } catch (err) {
            console.log(err)
        }
    }

    handleTextChange(value: string) {
        this.state.chirp.text = value
    }

    render() {
        return (
            <>
                <div className="card col-md-10 border">
                    <div className="card-body">
                        <h3 className="card-title">{this.state.chirp.name}</h3>
                        <div className="mb-3">
                            <label className="mr-2" htmlFor="text">Edit text:</label>
                            <input
                                className="form-control"
                                defaultValue={this.state.chirp.text}
                                type="text"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.handleTextChange(e.target.value)}
                            />
                        </div>
                        <div className="text-right">
                            <button className="btn btn-primary m-1" onClick={this.handleEdit}>Edit</button>
                            <button className="btn btn-primary" onClick={this.handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Admin;



