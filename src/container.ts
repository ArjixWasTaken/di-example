import { applyMiddleware, createContainer, Scope, type Container, type Middleware, type Token } from "di-wise";

const trace: Middleware = (composer) => {
    let depth = 0;
    composer.use("resolve", (next) => ((...args: Token[]) => {
        console.error(`${"  ".repeat(depth)}[di] resolve ${args.map((t) => t.name).join(" | ")}`);
        depth++;
        try {
            return (next as (...tokens: Token[]) => unknown)(...args);
        } finally {
            depth--;
        }
    }) as Container["resolve"]);
};

export function createAppContainer(): Container {
    const container = createContainer({ defaultScope: Scope.Container });
    return process.env.DEBUG_DI ? applyMiddleware(container, [trace]) : container;
}
