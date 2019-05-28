
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface MentionCardProps {
    chirp: { id: number, name: string, text: string, _created: Date }
}

const MentionCard: React.SFC<MentionCardProps> = (props) => {
    return (
        <div className="col-md-12">
            <div className="card p-2 m-3 shadow">
                <div className="card-body">
                    <h4 className="card-title">*** Chirped</h4>
                    <p className="card-text">{props.chirp.text}</p>
                    <p className="card-text">{props.chirp._created}</p>
                </div>
            </div>
        </div>
    );
}

export default MentionCard;

