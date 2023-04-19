"use strict";
const draw = {
    path: (ctx, path, color = "black") => {
        if (!ctx)
            throw new Error(`Context is null: (${ctx})`);
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        // @ts-ignore
        ctx.moveTo(...path[0]);
        for (let i = 1; i < path.length; i++) {
            // @ts-ignore
            ctx.lineTo(...path[i]);
        }
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    },
    paths: (ctx, paths, color = "black") => {
        for (const path of paths) {
            draw.path(ctx, path, color);
        }
    },
};
