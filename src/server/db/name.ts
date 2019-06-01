import { Query } from './index'

const getMentName = async (id: string) => Query('CALL spMentName(?)', [id]);

export default {
    getMentName
}