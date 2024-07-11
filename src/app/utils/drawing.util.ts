import { VectorObject2D } from "../canvas/canvas.model";

export class DrawingUtil {

    static drawLine(ctx: CanvasRenderingContext2D, baslangic: VectorObject2D, bitis: VectorObject2D){
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(baslangic.i, baslangic.j);
            ctx.lineTo(bitis.i, bitis.j);
            ctx.stroke();
          }
    }
}