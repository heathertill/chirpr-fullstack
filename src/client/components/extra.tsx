
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';


export interface MentionCardProps extends RouteComponentProps<{ selectedUserId: any }> {
    
}
export interface MentionCardState {
    chirps: { id: number, userid: number, text: string, _created: Date }[],
   
}

class MentionCard extends React.Component<MentionCardProps, MentionCardState> {
    constructor(props: MentionCardProps) {
        super(props);
        this.state = {
            chirps: [],
            
        };
    }

    async componentWillMount() {
        console.log('ment fired')
        console.log('selectedUserId in ment:', this.props.selectedUserId);
        let id = this.props.selectedUserId;
        console.log(id)
        try {
            let res = await fetch(`/api/mentions/${id}`);
            let chirps = await res.json();
            this.setState({ chirps })
            console.log('chirps from mention Card:', chirps)
        } catch (err) {
            console.log(err);
        }
    }

    // render() {
    //     return (
    //         <div className="col-md-12">
    //             {this.state.chirps.map(chirp => {
    //                 return (
    //                     <div className="card p-2 m-3 shadow">
    //                         <div className="card-body">
    //                             <h4 className="card-title">*** Chirped</h4>
    //                             <p className="card-text">{chirp.text}</p>
    //                             <p className="card-text">{chirp._created}</p>
    //                         </div>
    //                     </div>
    //                 )
    //             })}

    //         </div>);
    // }

    render() {
        return (
            <div>
                <div className="col-md-12 crust">
                    <div className="card">
                        <div className="card-body">
                            <h3>Hello</h3>
                            <h3>{this.props.selectedUserId}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 pizza">
                    {this.state.chirps.map(chirp => {
                        return (
                            <div className="card p-2 m-3 shadow">
                                <div className="card-body">
                                    <h4 className="card-title">*** Chirped</h4>
                                    <p className="card-text">{chirp.text}</p>
                                    <p className="card-text">{chirp._created}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        )

    }
}

export default MentionCard;






