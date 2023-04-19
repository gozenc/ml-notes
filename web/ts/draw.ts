const draw = {
  path: (
    ctx: CanvasRenderingContext2D | null,
    path: number[][],
    color = "black"
  ) => {
    if (!ctx) throw new Error(`Context is null: (${ctx})`);
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

  paths: (
    ctx: CanvasRenderingContext2D | null,
    paths: number[][][],
    color = "black"
  ) => {
    for (const path of paths) {
      draw.path(ctx, path, color);
    }
  },
};
