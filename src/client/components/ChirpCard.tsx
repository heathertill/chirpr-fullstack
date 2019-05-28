
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ChirpCardProps {
    chirp: { id: number, name: string, text: string }
}

const ChirpCard: React.SFC<ChirpCardProps> = (props) => {
    return (
        <div className="col-md-12">
            <div className="card p-2 m-3 shadow">
                <div className="card-body">
                    <h4 className="card-title">{props.chirp.name}</h4>
                    <p className="card-text">{props.chirp.text}</p>
                    <div>
                        <div className="text-right">
                            <Link className="btn btn-primary" to={`/${props.chirp.id}/admin`}>Options</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChirpCard;

