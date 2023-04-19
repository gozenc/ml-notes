"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SketchPad_instances, _SketchPad_addEventListeners, _SketchPad_redraw, _SketchPad_getMouse;
class SketchPad {
    constructor(container, size = 400) {
        _SketchPad_instances.add(this);
        this.paths = [];
        this.isDrawing = false;
        this.canvas = document.createElement("canvas");
        this.canvas.height = size;
        this.canvas.width = size;
        this.canvas.setAttribute("style", `background-color: white; box-shadow: 0px 0px 10px 2px black;`);
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
        __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_redraw).call(this);
        __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_addEventListeners).call(this);
    }
    reset() {
        this.paths = [];
        this.isDrawing = false;
        __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_redraw).call(this);
    }
}
_SketchPad_instances = new WeakSet(), _SketchPad_addEventListeners = function _SketchPad_addEventListeners() {
    if (!this.canvas) {
        return;
    }
    this.canvas.onmousedown = (evt) => {
        const mouse = __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_getMouse).call(this, evt);
        this.paths.push([mouse]);
        this.isDrawing = true;
    };
    this.canvas.onmousemove = (evt) => {
        if (this.isDrawing) {
            const lastPath = this.paths[this.paths.length - 1];
            const mouse = __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_getMouse).call(this, evt);
            lastPath.push(mouse);
            __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_redraw).call(this);
        }
    };
    this.canvas.onmouseup = () => (this.isDrawing = false);
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
    this.canvas.ontouchend = () => {
        // @ts-ignore
        this.canvas.onmouseup();
    };
    this.undoBtn.onclick = () => {
        this.paths.pop();
        __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_redraw).call(this);
    };
}, _SketchPad_redraw = function _SketchPad_redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
    if (this.paths.length > 0) {
        this.undoBtn.disabled = false;
    }
    else {
        this.undoBtn.disabled = true;
    }
}, _SketchPad_getMouse = function _SketchPad_getMouse(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return [
        Math.round(evt.clientX - rect.left),
        Math.round(evt.clientY - rect.top),
    ];
};
