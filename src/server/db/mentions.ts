import { Query } from './index'


const getAllMentions = async (userid: number) => Query('CALL spUserMentions(?)', [userid]);
const createMention = async (userid: number, chirpid: number) => Query('INSERT INTO mentions (userid, chirpid) VALUES(?, ? )', [userid, chirpid]);
// const getAllMentions = async (userid: number) => Query('CALL spMentionChirps(?)', [userid]);

export default {
    createMention,
    getAllMentions
}