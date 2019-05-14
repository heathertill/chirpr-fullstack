import { Connection, Query } from './index';

const all = async () => Query('SELECT u.name, c.id, c.text, c._created FROM chirps c JOIN users u ON u.id = c.userid ORDER BY c._created DESC');
const one = async (id: number) => Query('SELECT u.name, c.text FROM chirps c JOIN users u ON u.id = c.userid WHERE c.id = ?', [id]);
const createChirp = async (userid: number, text: string) => Query('INSERT INTO chirps (userid, text) VALUES (?, ?)', [userid, text]);
const updateChirp = async (text: string, id: number) => Query('UPDATE chirps SET text = ? WHERE id = ?', [text, id]);
const deleteChirp = async (id: number) => Query('DELETE FROM chirps WHERE id = ?', [id]);

// export const all = async () => {
//     let query = 'SELECT u.name, c.id, c.text, c._created FROM chirps c JOIN users u ON u.id = c.userid ORDER BY c._created DESC';
//     return new Promise((resolve, reject) => {
//         Connection.query(query, (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         })
//     })
// }

// export const one = async (id: number) => {
//     let query = 'SELECT u.name, c.text FROM chirps c JOIN users u ON u.id = c.userid WHERE c.id = ?';
//     return new Promise((resolve, reject) => {
//         Connection.query(query, [id], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         })
//     })
// }

// export const createChirp = (userid: number, text: string) => {
//     let query = 'INSERT INTO chirps (userid, text) VALUES (?)';
//     return new Promise((resolve, reject) => {
//         Connection.query(query, [[userid, text]], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         })
//     })
// }

// export const updateChirp = (id: number,   text: string) => {
//     let query = 'UPDATE chirps SET text = ? WHERE id = ?';
//     return new Promise((resolve, reject) => {
//         Connection.query(query, [[text, id]], (err, results) => {
//             if (err) {
//                 return reject(err);
//             }
//             resolve(results);
//         })
//     })
// }




export default {
    all,
    one,
    createChirp,
    updateChirp,
    deleteChirp
}


