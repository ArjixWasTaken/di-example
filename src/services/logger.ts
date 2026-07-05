import { inject } from "di-wise";
import { tokens, type Logger } from "../tokens.js";

export class ConsoleLogger implements Logger {
    private clock = inject(tokens.Clock);

    info(message: string): void {
        console.log(`[${this.clock.now().toISOString()}] INFO  ${message}`);
    }

    warn(message: string): void {
        console.warn(`[${this.clock.now().toISOString()}] WARN  ${message}`);
    }
}

export class JsonLogger implements Logger {
    private clock = inject(tokens.Clock);

    info(message: string): void {
        console.log(JSON.stringify({ level: "info", time: this.clock.now().toISOString(), message }));
    }

    warn(message: string): void {
        console.warn(JSON.stringify({ level: "warn", time: this.clock.now().toISOString(), message }));
    }
}
