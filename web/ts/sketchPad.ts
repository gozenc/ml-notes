class SketchPad {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public paths: number[][][] = [];
  private isDrawing = false;
  public undoBtn: HTMLButtonElement;

  constructor(container: HTMLElement, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.height = size;
    this.canvas.width = size;
    this.canvas.setAttribute(
      "style",
      `background-color: white; box-shadow: 0px 0px 10px 2px black;`
    );
    container.appendChild(this.canvas);

    const lineBreak = document.createElement("br");
    container.appendChild(lineBreak);

    this.undoBtn = document.createElement("button");
    this.undoBtn.innerHTML = "UNDO";
    container.appendChild(this.undoBtn);

    const context = this.canvas.getContext("2d");
    if (!context) {
      throw `Context is null. Exiting.`;
    }
    this.ctx = context;
    this.#redraw();
    this.#addEventListeners();
  }

  reset() {
    this.paths = [];
    this.isDrawing = false;
    this.#redraw();
  }

  #addEventListeners() {
    if (!this.canvas) {
      return;
    }
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const lastPath = this.paths[this.paths.length - 1];
        const mouse = this.#getMouse(evt);
        lastPath.push(mouse);
        this.#redraw();
      }
    };

    document.onmouseup = () => (this.isDrawing = false);

    this.canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0];
      // @ts-ignore
      this.canvas.onmousedown(loc);
    };

    this.canvas.ontouchmove = (evt) => {
      const loc = evt.touches[0];
      // @ts-ignore
      this.canvas.onmousemove(loc);
    };

    document.ontouchend = () => {
      // @ts-ignore
      document.onmouseup();
    };

    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.#redraw();
    };
  }

  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
      this.undoBtn.disabled = false;
    } else {
      this.undoBtn.disabled = true;
    }
  }

  #getMouse(evt: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  }
}
