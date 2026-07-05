import { inject, type Container } from "di-wise";
import { tokens, type Plugin } from "../tokens.js";

class GreeterPlugin implements Plugin {
    readonly name = "greeter";

    private logger = inject(tokens.Logger);
    private settings = inject(tokens.Settings);

    run(): void {
        const excited = this.settings.bool("greeter.excited");
        this.logger.info(`Hello from ${this.name}${excited ? "!!!" : "."}`);
    }
}

export function installGreeter(container: Container): void {
    container.register(tokens.Plugin, { useClass: GreeterPlugin });

    // prettier-ignore
    container.register(tokens.PluginSettings, { useValue: [
        { type: "boolean", name: "greeter.excited", default: true },
    ] });
}
