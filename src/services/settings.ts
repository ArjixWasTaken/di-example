import { injectAll } from "di-wise";
import { tokens, type Settings } from "../tokens.js";

export class SettingsService implements Settings {
    private definitions = new Map(
        injectAll(tokens.PluginSettings)
            .flat()
            .map((def) => [def.name, def]),
    );

    bool(name: string): boolean {
        const { def, raw } = this.lookup(name);
        return raw !== undefined ? raw === "true" || raw === "1" : (def.default as boolean);
    }

    num(name: string): number {
        const { def, raw } = this.lookup(name);
        return raw !== undefined ? Number(raw) : (def.default as number);
    }

    private lookup(name: string) {
        const def = this.definitions.get(name);
        if (!def) throw new Error(`unknown setting "${name}" — did its plugin register it?`);
        const raw = process.env[name.replace(/\W/g, "_").toUpperCase()];
        return { def, raw };
    }
}
