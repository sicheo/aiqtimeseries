import { CommandData } from "./interface/commandData";

export class CommandReceiver {
    protected readonly client: any;

    constructor(client: any) {
        this.client = client;
    }

    public executeCommand(commandData: CommandData): Promise<any> {
        return new Promise<any>(resolve => {
            const command = commandData.commandFunction;
            resolve(command.call(this.client, ...commandData.commandParams));
        })
            .then(res => {
                return res;
            })
            .catch(err => {
                throw new Error(
                    `error when executing command "${commandData.commandName} ${commandData.commandParams.join(
                        " "
                    )}": ${err.message}`
                );
            });
    }
}
