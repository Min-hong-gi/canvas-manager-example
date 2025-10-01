import { animate, frameLate } from "2d-canvas-supportor/helper";
import { CanvasManager, eventDecoratorFactory, EventManager } from "2d-canvas-supportor/manager";
import { lerp, rand } from "2d-canvas-supportor/util";
import { GrapeDot } from "./graph/Graph-dot";
import { Grape } from "./graph/Graph";
import { sec } from "2d-canvas-supportor/unit";

const canvasEl = document.querySelector('#main-canvas') as HTMLCanvasElement;
const mainCanvas = new CanvasManager(canvasEl);
mainCanvas.resize();

const eventManager = new EventManager(canvasEl);
const mainEvent = eventDecoratorFactory(eventManager);
const grapeData = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0,
    '13': 0,
    '14': 0,
    '15': 0,
    '16': 0,
    '17': 0,
    '18': 0,
    '19': 0,
    '20': 0,
    '21': 0,
    '22': 0,
    '23': 0,
    '24': 0,
}
const grape = new Grape(mainCanvas.canvasWidth, mainCanvas.canvasHeight, grapeData);

@mainEvent
class EventTarget extends GrapeDot { }
grape.dots = Array.from({ length: Object.keys(grape.renderData).length }, () => new EventTarget());
grape.dots.forEach(x => {
    x.fixed = true;
    x.addEventListener('click', () => {
        x.fixed = !x.fixed;
    });
    x.addEventListener('mouseenter', () => {
        x.hover = true;
        animate((t) => {
            x.opacity = lerp(0, 1, t);
        }, sec`0.1`);
        canvasEl.style.cursor = 'pointer';
    });
    x.addEventListener('mouseleave', () => {
        x.hover = false;
        animate((t) => {
            x.opacity = lerp(1, 0, t);
        }, sec`0.1`);
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
setInterval(() => {
    const origin = grape.data;
    const nData: { [k: string]: number } = {
        '1': rand(-500, 1000),
        '2': rand(-500, 1000),
        '3': rand(-500, 1000),
        '4': rand(-500, 1000),
        '5': rand(-500, 1000),
        '6': rand(-500, 1000),
        '7': rand(-500, 1000),
        '8': rand(-500, 1000),
        '9': rand(-500, 1000),
        '10': rand(-500, 1000),
        '11': rand(-500, 1000),
        '12': rand(-500, 1000),
        '13': rand(-500, 1000),
        '14': rand(-500, 1000),
        '15': rand(-500, 1000),
        '16': rand(-500, 1000),
        '17': rand(-500, 1000),
        '18': rand(-500, 1000),
        '19': rand(-500, 1000),
        '20': rand(-500, 1000),
        '21': rand(-500, 1000),
        '22': rand(-500, 1000),
        '23': rand(-500, 1000),
        '24': rand(-500, 1000),
    }
    animate((t, delta, alpha) => {
        let renderData: { [k: string]: number } = {};
        Object.keys(nData).forEach(key => {
            renderData[key] = lerp(origin[key], nData[key], t);
        });
        grape.renderData = renderData;
    }, sec`1`, 60, ()=>{
        grape.data = nData;
    });
}, sec`3`);