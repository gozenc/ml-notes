class SketchPad {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D | null;
  public paths: number[][][] = [];
  public isDrawing = false;
  constructor(container: HTMLElement, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.height = size;
    this.canvas.width = size;
    this.canvas.setAttribute(
      "style",
      `background-color: white; box-shadow: 0px 0px 10px 2px black;`
    );
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      this.paths.push([this.#getMouse(evt)]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(this.#getMouse(evt));
        this.#redraw();
      }
    };

    this.canvas.onmouseup = () => (this.isDrawing = false);

    this.canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0];
      if (loc && this.canvas) {
        //
      }
    };
  }

  #redraw() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
  }

  #getMouse(evt: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  }
}
