import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { count } from 'console';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  width = 800; // x axis
  height = 600; // y axis

  rotateCounter = 0;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;



    // if (this.ctx) {
    //   this.ctx.fillStyle = 'white';
    //   this.ctx.fillRect(0, 0, width, height);

    //   this.ctx.fillStyle = 'black';
    //   this.ctx.fillRect(width / 2, height / 2, 20, 20);
    // }
  }

  putRectangle() {
    if (this.ctx) {
      // this.ctx.fillStyle = 'white';
      // this.ctx.fillRect(0, 0, this.width, this.height);

      this.ctx.fillStyle = 'red';
      this.ctx.fillRect(this.width / 2, this.height / 2, 20, 20);

      // this.ctx.beginPath();
      // this.ctx.moveTo(20, 20);
      // this.ctx.lineTo(this.width / 2, this.height / 2);
      // this.ctx.stroke();
    }
  }

  point10_10() {
    if (this.ctx) {
      this.ctx.fillStyle = 'black';
      // this.ctx.fillRect(10, 10, 5, 5);
      this.ctx.fillRect(this.width/2, this.height/2, 5, 5);
    }
  }
  drawLine() {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(20, 20);
      this.ctx.lineTo(200, 200);
      this.ctx.stroke();
    }

  }

  rotateLine() {
    // console.log(Math.cos(this.angleToRadianConverter(60))); // 0.5
    var vector = [100, 100];
    vector = this.multiplyMatrixVector(this.rotationMatrix(this.rotateCounter * 15), vector);
    this.rotateCounter++;

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(20, 20);
      this.ctx.lineTo(vector[0], vector[1]);
      this.ctx.stroke();
    }
  }

  frameTransformation(){
    var vectorGlobal = [50, 50];

    var vector = [vectorGlobal[0] ,-vectorGlobal[1]]; // transformation
    console.log(vector);
    vector = [vector[0] + this.width/2, vector[1] + this.height/2]; // oteleme
    console.log(vector);

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width/2, this.height/2);
      this.ctx.lineTo(vector[0], vector[1]);
      this.ctx.stroke();
    }
  }

  rotateLineGlobal(){
    var vectorGlobal = [50, 50];
    var vector = [vectorGlobal[0] ,-vectorGlobal[1]]; // transformation
    vector = this.multiplyMatrixVector(this.rotationMatrix(this.rotateCounter * 15), vector); 
    vector = [vector[0] + this.width/2, vector[1] + this.height/2]; // oteleme
    console.log(vector);
    
    this.rotateCounter++;

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width/2, this.height/2);
      this.ctx.lineTo(vector[0], vector[1]);
      this.ctx.stroke();
    }
  }

  clear() {
    if (this.ctx) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, 800, 600);
    }
  }

  rotationMatrix(angle: number) {
    return [
      [Math.cos(this.angleToRadianConverter(angle)), -Math.sin(this.angleToRadianConverter(angle))],
      [Math.sin(this.angleToRadianConverter(angle)), Math.cos(this.angleToRadianConverter(angle))]
    ];
  }

  // Function to multiply a 2D rotation matrix by a column vector
  multiplyMatrixVector(matrix: any, vector: any) {
    const x = vector[0];
    const y = vector[1];

    const result = [
      matrix[0][0] * x + matrix[0][1] * y,
      matrix[1][0] * x + matrix[1][1] * y
    ];

    return result;
  }
  angleToRadianConverter(angle: number) {
    return Math.PI * (angle / 180);
  }
}