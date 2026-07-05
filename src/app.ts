import { inject, injectAll } from "di-wise";
import { tokens } from "./tokens.js";

export class App {
    private logger = inject(tokens.Logger);

    private plugins = injectAll(tokens.Plugin);

    run(): void {
        this.logger.info(`booting with ${this.plugins.length} plugin(s)`);

        for (const plugin of this.plugins) {
            try {
                plugin.run();
            } catch (error) {
                this.logger.warn(`plugin "${plugin.name}" failed: ${error}`);
            }
        }

        this.logger.info("done");
    }
}
