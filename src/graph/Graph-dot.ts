import { BoundBox } from "2d-canvas-supportor/helper";
import { CanvasEventTarget, CanvasManager } from "2d-canvas-supportor/manager";
import { len, subtract } from '2d-canvas-supportor/util';

export class GrapeDot extends CanvasEventTarget {
    x: number = -1;
    y: number = -1;
    size = 0;
    value: any = null;
    opacity = 0;
    fixed = false;

    hasInside(x: number, y: number): boolean {
        return len(subtract({ x, y }, { x: this.x, y: this.y })) <= this.size;
    }
    getBoundBox(): BoundBox {
        return {
            x: this.x - this.size,
            y: this.y - this.size,
            width: this.size * 2,
            height: this.size * 2,
        }
    }
    render(canvas: CanvasManager) {
        canvas.draw((ctx) => {
            ctx.fillStyle = '#3af';
            if(this.fixed || this.__hover) {
                ctx.fillStyle = '#f56';
            }
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        });
        if(this.fixed) {
            this.opacity = 1;
        }

        canvas.draw((ctx) => {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            const matrics = ctx.measureText(this.value);
            const height = matrics.actualBoundingBoxDescent * 1.2;
            ctx.fillRect(this.x+ this.size * 2, this.y - height/2, matrics.width, height);
        });
        canvas.draw((ctx) => {
            ctx.fillStyle = `rgba(3, 3, 3, ${this.opacity})`;
            ctx.textAlign = 'left';
            ctx.fillText(this.value, this.x + this.size * 2, this.y);
        });
    }
}