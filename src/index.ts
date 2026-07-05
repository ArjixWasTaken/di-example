import { App } from "./app.js";
import { createAppContainer } from "./container.js";
import { SystemClock } from "./services/clock.js";
import { ConsoleLogger, JsonLogger } from "./services/logger.js";
import { SettingsService } from "./services/settings.js";
import { installGreeter } from "./plugins/greeter.js";
import { installUptime } from "./plugins/uptime.js";
import { tokens } from "./tokens.js";

const container = createAppContainer();

container.register(tokens.Clock, { useClass: SystemClock });

container.register(tokens.Logger, {
    useClass: process.env.LOG_FORMAT === "json" ? JsonLogger : ConsoleLogger,
});

container.register(tokens.Settings, { useClass: SettingsService });

for (const install of [installGreeter, installUptime]) {
    install(container);
}

container.register(App);

container.resolve(App).run();
