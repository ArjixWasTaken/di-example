import { container, tokens } from "../container.js";

container.register(tokens.PluginSettings, { useValue: [{ type: "boolean", name: "plugin-a.bool", default: true }] });
