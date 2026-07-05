import { inject, type Container } from "di-wise";
import { tokens, type Plugin } from "../tokens.js";

class UptimePlugin implements Plugin {
    readonly name = "uptime";

    private logger = inject(tokens.Logger);
    private clock = inject(tokens.Clock);
    private settings = inject(tokens.Settings);

    run(): void {
        const precision = this.settings.num("uptime.precision");
        const uptime = process.uptime().toFixed(precision);
        this.logger.info(`process up ${uptime}s as of ${this.clock.now().toISOString()}`);
    }
}

export function installUptime(container: Container): void {
    container.register(tokens.Plugin, { useClass: UptimePlugin });

    // prettier-ignore
    container.register(tokens.PluginSettings, { useValue: [
        { type: "number", name: "uptime.precision", default: 1 },
    ] });
}
