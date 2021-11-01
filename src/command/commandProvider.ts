import * as Redis from "ioredis";
import { CommandData } from "./interface/commandData";
import { CommandName } from "../enum/commandName";
import { StringNumberArray } from "../index";

export class CommandProvider {
    protected readonly client: any;
    protected commands: object;

    constructor(redisClient: any) {
        this.client = redisClient;
        this.commands = {};
        this.buildCommands();
    }

    public getCommand(commandName: string): () => any {
        return this.commands[commandName];
    }

    public getCommandData(commandName: string, params: StringNumberArray): CommandData {
        return {
            commandName: commandName,
            commandFunction: this.getCommand(commandName),
            commandParams: params
        };
    }

    public getRTSClient(): any {
        return this.client;
    }

    protected buildCommands(): void {
        for (const key in CommandName) {
            const command: string = CommandName[key];
            const redisCommand = this.client.createBuiltinCommand(command);
            // @ts-ignore
            this.commands[command] = redisCommand.string;
        }
    }
}
