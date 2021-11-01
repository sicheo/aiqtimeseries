import { RedisTimeSeriesFactory } from "../../factory/redisTimeSeries";
import { redisOptions, startupOptions } from "../../__tests_config__/data";

test("lazy connection", async () => {  
    const factory = new RedisTimeSeriesFactory(redisOptions, startupOptions);
    const rtsClient = factory.create();
    const created = await rtsClient.create("connection");
    expect(created).toEqual(true);

    const deleted = await rtsClient.delete("connection");
    expect(deleted).toEqual(true);

    const disconnected = await rtsClient.disconnect();
    expect(disconnected).toEqual(true);
});
