import { CommandInterface } from "./interface/command";
import * as Redis from "ioredis";

export class DeleteCommand implements CommandInterface {
    protected readonly receiver: Redis.Cluster;
    protected readonly keys: string[];

    constructor(receiver: Redis.Cluster, keys: string[]) {
        this.keys = keys;
        this.receiver = receiver;
    }

    public execute(): Promise<number> {
        return this.receiver.del(...this.keys);
    }
}
