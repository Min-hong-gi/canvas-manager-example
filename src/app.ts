import { animate, frameLate } from "2d-canvas-supportor/helper";
import { CanvasManager, eventDecoratorFactory, EventManager } from "2d-canvas-supportor/manager";
import { lerp, rand } from "2d-canvas-supportor/util";
import { GrapeDot } from "./graph/Graph-dot";
import { Grape } from "./graph/Graph";

const canvasEl = document.querySelector('#main-canvas') as HTMLCanvasElement;
const mainCanvas = new CanvasManager(canvasEl);
mainCanvas.resize();

const eventManager = new EventManager(canvasEl);
const mainEvent = eventDecoratorFactory(eventManager);
const grapeData = {
    '0': rand(1, 10) * 100,
    '1': rand(1, 10) * 100,
    '2': rand(1, 10) * 100,
    '3': rand(1, 10) * 100,
    '4': rand(1, 10) * 100,
    '5': rand(1, 10) * 100,
    '6': rand(1, 10) * 100,
    '7': rand(1, 10) * 100,
    '8': rand(1, 10) * 100,
    '9': rand(1, 10) * 100,
    '10': rand(1, 10) * 100,
    '11': rand(1, 10) * 100,
    '12': rand(1, 10) * 100,
    '13': rand(1, 10) * 100,
    '14': rand(1, 10) * 100,
    '15': rand(1, 10) * 100,
    '16': rand(1, 10) * 100,
    '17': rand(1, 10) * 100,
    '18': rand(1, 10) * 100,
    '19': rand(1, 10) * 100,
    '20': rand(1, 10) * 100,
    '21': rand(1, 10) * 100,
    '22': rand(1, 10) * 100,
    '23': rand(1, 10) * 100,
    '24': rand(1, 10) * 100,
}
const grape = new Grape(mainCanvas.canvasWidth, mainCanvas.canvasHeight, grapeData);


@mainEvent
class EventTarget extends GrapeDot { }
grape.dots = Array.from({ length: Object.keys(grape.renderData).length }, () => new EventTarget());
grape.dots.forEach(x => {
    x.addEventListener('click', () => {
        x.fixed = !x.fixed;
    });
    x.addEventListener('mouseenter', () => {
        x.hover = true;
        animate((t) => {
            x.opacity = lerp(0, 1, t);
        }, 0.1);
        canvasEl.style.cursor = 'pointer';
    });
    x.addEventListener('mouseleave', () => {
        x.hover = false;
        animate((t) => {
            x.opacity = lerp(1, 0, t);
        }, 0.1);
        canvasEl.style.cursor = 'auto';
    });
});


window.addEventListener('resize', () => {
    mainCanvas.resize();
    grape.resize(mainCanvas.canvasWidth, mainCanvas.canvasHeight);
    grape.render(mainCanvas);
});

frameLate(60,
    () => {
        eventManager.update();
        return true;
    },
    () => {
        mainCanvas.clear();
        grape.render(mainCanvas);
    }
);

animate((t, delta, alpha) => {
    let renderData: { [k: string]: number } = {};
    Object.keys(grape.data).forEach(key => {
        renderData[key] = lerp(0, grape.data[key], t);
    });
    grape.renderData = renderData;
}, 1);