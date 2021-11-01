import * as Redis from "ioredis";
import { RedisTimeSeries } from "../redisTimeSeries";
import { RequestParamsDirector } from "../builder/requestParamsDirector";
import { RenderFactory } from "./render";
import { CommandProvider } from "../command/commandProvider";
import { CommandInvoker } from "../command/commandInvoker";
import { CommandReceiver } from "../command/commandReceiver";
import { RequestParamsBuilder } from "../builder/requestParamsBuilder";

export class RedisTimeSeriesFactory {
    protected options = {
        iscluster: false,
        redisOptions: {
            port: 6379,
            host: "127.0.0.1",
            db: 0
        }
    };

    protected commprov: CommandProvider | null = null;

    protected startupNodes = [{ host: "127.0.0.1", port: 7000 }];

    constructor(options: any, startupNodes?: any) {
        this.options = { ...this.options, ...options };
        if (startupNodes)
            this.startupNodes = startupNodes;
    }

    public create(): RedisTimeSeries {
        const commandProvider: CommandProvider = new CommandProvider(this.getRedisClient());
        this.commprov = commandProvider;
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

    public getCommandProvider(): CommandProvider | null {
        return this.commprov;
    }
    /*
    protected getRedisClient(): Redis.Cluster {
        try {
            const clusterClient = new Redis.Cluster(this.startupNodes, this.options);
            return clusterClient;
        } catch (error) {
            throw "Unable to connect to cluster";
        }
    }*/
    protected getRedisClient(): any {
        try {
            let client: any;
            if (this.options.iscluster) client = new Redis.Cluster(this.startupNodes, this.options);
            else
                client = new Redis(
                    this.options.redisOptions.port,
                    this.options.redisOptions.host,
                    this.options.redisOptions
                );

            return client;
        } catch (error) {
            throw "Unable to connect to Redis Server: cluster " + this.options.iscluster;
        }
    }
}
