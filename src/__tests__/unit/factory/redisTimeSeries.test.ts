import { RedisTimeSeriesFactory } from "../../../factory/redisTimeSeries";
import { CommandProvider } from "../../../command/commandProvider";
import { CommandReceiver } from "../../../command/commandReceiver";
import { RequestParamsDirector } from "../../../builder/requestParamsDirector";
import { RedisTimeSeries } from "../../../redisTimeSeries";
import * as Redis from "ioredis";
import { RequestParamsBuilder } from "../../../builder/requestParamsBuilder";
import { redisOptions, startupOptions } from "../../../__tests_config__/data";

jest.mock("../../../command/commandProvider");
jest.mock("../../../command/commandReceiver");
jest.mock("../../../builder/requestParamsDirector");
jest.mock("ioredis");

it("Factory creates a RedisTimeSeries object", () => {
    const factory = new RedisTimeSeriesFactory(redisOptions, startupOptions);
    const redisTimeSeries = factory.create();

    expect(CommandProvider).toHaveBeenCalledTimes(1);
    expect(Redis).toHaveBeenCalledTimes(1);
    expect(Redis).toHaveBeenCalledWith(redisOptions.redisOptions.port,
        redisOptions.redisOptions.host,
        redisOptions.redisOptions);
    expect(CommandReceiver).toHaveBeenCalledTimes(1);
    expect(RequestParamsDirector).toHaveBeenCalledTimes(1);
    expect(RequestParamsDirector).toHaveBeenCalledWith(new RequestParamsBuilder());
    expect(redisTimeSeries).toBeInstanceOf(RedisTimeSeries);
});
