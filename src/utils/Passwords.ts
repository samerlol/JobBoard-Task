import bcrypt from 'bcrypt';

const saltRounds = 10;

export default class Password {
    constructor() { }
    async generateHash(password: string) {
        return await bcrypt.hash(password, saltRounds);
    }
    async compare(password: string, HashedPassword: string) {
        return await bcrypt.compare(password, HashedPassword);
    }
}