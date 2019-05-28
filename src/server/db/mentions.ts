import { Query } from './index'


const getAllMentions = async (userid: number) => Query('CALL spUserMentions(?)', [userid]);
const createMention = async (userid: number, chirpid: number) => Query('INSERT INTO mentions (userid, chirpid) VALUES(?, ? )', [userid, chirpid]);


export default {
    createMention,
    getAllMentions
}