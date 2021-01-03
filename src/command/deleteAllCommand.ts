import { CommandInterface } from "./interface/command";
import * as Redis from "ioredis";

export class DeleteAllCommand implements CommandInterface {
    protected readonly receiver: Redis.Cluster;

    constructor(receiver: Redis.Cluster) {
        this.receiver = receiver;
    }

    public execute(): Promise<any> {
        return this.receiver.flushdb();
    }
}
