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
        this.ctx = this.canvas.getContext("2d");
        __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_addEventListeners).call(this);
    }
}
_SketchPad_instances = new WeakSet(), _SketchPad_addEventListeners = function _SketchPad_addEventListeners() {
    this.canvas.onmousedown = (evt) => {
        this.paths.push([__classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_getMouse).call(this, evt)]);
        this.isDrawing = true;
    };
    this.canvas.onmousemove = (evt) => {
        if (this.isDrawing) {
            const lastPath = this.paths[this.paths.length - 1];
            lastPath.push(__classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_getMouse).call(this, evt));
            __classPrivateFieldGet(this, _SketchPad_instances, "m", _SketchPad_redraw).call(this);
        }
    };
    this.canvas.onmouseup = () => (this.isDrawing = false);
    this.canvas.ontouchstart = (evt) => {
        const loc = evt.touches[0];
        if (loc && this.canvas) {
            this.canvas.onmousedown(loc);
        }
    };
}, _SketchPad_redraw = function _SketchPad_redraw() {
    var _a;
    (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
}, _SketchPad_getMouse = function _SketchPad_getMouse(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return [
        Math.round(evt.clientX - rect.left),
        Math.round(evt.clientY - rect.top),
    ];
};
