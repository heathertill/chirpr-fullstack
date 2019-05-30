import * as mysql from 'mysql';

import Chirps from './chirps';
import Users from './users';
import Mentions from './mentions';
import Name from './name';
import MentionName from './mentionName';

export const Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'chirprapp',
    password: 'abcde',
    database: 'chirpr'
});

Connection.connect(err => {
    if (err) console.log(err);
})

export const Query = (query: string, values?: Array<string | number>) => {
    return new Promise<Array<any>>((resolve, reject) => {
        Connection.query(query, values, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
        })
    })
}

export default {
    Chirps,
    Users,
    Mentions,
    Name,
    MentionName
}

/// import each table from your database here