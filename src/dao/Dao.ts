import DBManager from "@src/models/DBManager";

class Dao {
    protected db: DBManager | unknown;

    protected static instance: unknown;
    protected constructor() {}

    protected static setSingleton(): void {
        if (this.instance == null) this.instance = new this();
    }
    static getInstance(): unknown {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }
}

export default Dao;
