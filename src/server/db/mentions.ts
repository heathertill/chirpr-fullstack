import { Query } from './index'


const getAllMentions = async (userid: number) => Query('SELECT chirpid FROM mentions WHERE userid = ?', [userid]);
const createMention = async (userid: number, chirpid: number) => Query('INSERT INTO mentions (userid, chirpid) VALUES(?, ? )', [userid, chirpid]);




export default {
    createMention,
    getAllMentions
}