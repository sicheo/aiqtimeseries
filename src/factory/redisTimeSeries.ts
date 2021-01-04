import * as Redis from "ioredis";
import { RedisTimeSeries } from "../redisTimeSeries";
import { RequestParamsDirector } from "../builder/requestParamsDirector";
import { RenderFactory } from "./render";
import { CommandProvider } from "../command/commandProvider";
import { CommandInvoker } from "../command/commandInvoker";
import { CommandReceiver } from "../command/commandReceiver";
import { RequestParamsBuilder } from "../builder/requestParamsBuilder";
import { ConnectionOptions } from "../index";

export class RedisTimeSeriesFactory {
    protected options: any = {
        redisOptions:
        {
            port: 6379,
            host: "127.0.0.1",
            db: 0
        }
    };

    protected startupNodes = [{ host: "127.0.0.1", port: 7000 }];

    constructor(startupNodes: any, options: any = {}) {
        this.options = { ...this.options, ...options };
        this.startupNodes = startupNodes;
    }

    public create(): RedisTimeSeries {
        const commandProvider: CommandProvider = new CommandProvider(this.getRedisClient());
        const commandReceiver: CommandReceiver = new CommandReceiver(commandProvider.getRTSClient());
        const director: RequestParamsDirector = new RequestParamsDirector(new RequestParamsBuilder());

        return new RedisTimeSeries(
            commandProvider,
            commandReceiver,
            new CommandInvoker(),
            director,
            new RenderFactory()
        );
    }

    protected getRedisClient(): Redis.Cluster {
        return new Redis.Cluster(this.startupNodes, this.options);
    }
}
