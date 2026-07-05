import type { Clock } from "../tokens.js";

export class SystemClock implements Clock {
    now(): Date {
        return new Date();
    }
}
