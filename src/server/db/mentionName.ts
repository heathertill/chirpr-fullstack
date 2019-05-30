import { Query } from './index'


const getMentions = async (userid: number) => Query('CALL spGetMentions(?)', [userid]);

export default {
    getMentions
}