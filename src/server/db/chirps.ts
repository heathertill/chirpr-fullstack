import { Query } from './index';

const all = async () => Query('SELECT * FROM chirps');

export default {
    all
}



