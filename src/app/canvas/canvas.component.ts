import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Point3D, VectorObject2D } from './canvas.model';
import { MatrixUtil } from '../utils/matrix.util';
import { DrawingUtil } from '../utils/drawing.util';


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

  centerOfTheScreen = new VectorObject2D(this.width / 2, this.height / 2)

  rotateCounter = 0;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;



    if (this.ctx) {
      //   this.ctx.fillStyle = 'white';
      //   this.ctx.fillRect(0, 0, width, height);
      //   this.ctx.fillStyle = 'black';
      //   this.ctx.fillRect(width / 2, height / 2, 20, 20);
      // this.rectangleWith4Parameter();
    }

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
      this.ctx.fillRect(this.width / 2, this.height / 2, 5, 5);
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

  drawLineParametric(baslangic: VectorObject2D, bitis: VectorObject2D) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(baslangic.i, baslangic.j);
      this.ctx.lineTo(bitis.i, bitis.j);
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

  frameTransformation() {
    var vectorGlobal = [50, 50];

    var vector = [vectorGlobal[0], -vectorGlobal[1]]; // transformation
    console.log(vector);
    vector = [vector[0] + this.width / 2, vector[1] + this.height / 2]; // oteleme
    console.log(vector);

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, this.height / 2);
      this.ctx.lineTo(vector[0], vector[1]);
      this.ctx.stroke();
    }
  }

  rotateLineGlobal() {
    var vectorGlobal = [50, 50];
    var vector = [vectorGlobal[0], -vectorGlobal[1]]; // transformation
    vector = this.multiplyMatrixVector(this.rotationMatrix(this.rotateCounter * 15), vector);
    vector = [vector[0] + this.width / 2, vector[1] + this.height / 2]; // oteleme
    console.log(vector);

    this.rotateCounter++;

    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, this.height / 2);
      this.ctx.lineTo(vector[0], vector[1]);
      this.ctx.stroke();
    }
  }

  changeFrame(newBasisMatrix: number[], coordinate: VectorObject2D) {
    var inverseBasisMatrix = [[1, 0], [0, -1]]; // inverse hesabi, screen icin ni elle girdim. hesap yapilmali aslinda.le

    // for (let i = 0; i < coordinates.length; i++) {
    var coordinateNew = this.multiplyMatrixVectorObject(inverseBasisMatrix, coordinate);
    // console.log(coordinateNew)
    // console.log(coordinates[i].x)
    coordinate.i = coordinateNew[0] + 400; // +400 oteleme icin.

    // console.log(coordinates[i].x)
    coordinate.j = coordinateNew[1] + 300;
    // 
    // console.log(coordinates)
    return coordinate;
  }
  rotatePoint(coordinate: VectorObject2D, angle: number) {
    var rotationMatrix = this.rotationMatrix(angle);
    var coordinateNew = this.multiplyMatrixVectorObject(rotationMatrix, coordinate);
    return new VectorObject2D(coordinateNew[0], coordinateNew[1])
  }

  rectangleRotate(coordinates: VectorObject2D[]) {

    this.clear();

    for (let i = 0; i < coordinates.length; i++) {

      coordinates[i] = this.rotatePoint(coordinates[i], 15 * this.rotateCounter)

      coordinates[i] = this.changeFrame([], coordinates[i])
    }

    this.rectangleWith4Coordinates(coordinates);

    this.rotateCounter++;
  }

  rectangleWith4Coordinates(coordinates: any) {

    // Begin path
    this.ctx.beginPath();

    // Move to the first corner
    this.ctx.moveTo(coordinates[0].x, coordinates[0].y);

    // Draw lines to each of the subsequent corners
    for (let i = 1; i < coordinates.length; i++) {
      this.ctx.lineTo(coordinates[i].x, coordinates[i].y);
    }

    // Close the path by connecting the last corner to the first
    this.ctx.closePath();

    // Set fill color
    this.ctx.fillStyle = 'blue';

    // Fill the rectangle
    this.ctx.fill();

    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();

  }
  rectangleWith4Parameter() {

    // Corner coordinates
    const corners = [
      { x: 50, y: 70 },
      { x: 350, y: 50 },
      { x: 150, y: 150 },
      { x: 50, y: 150 }
    ];
    // Begin path
    this.ctx.beginPath();

    // Move to the first corner
    this.ctx.moveTo(corners[0].x, corners[0].y);

    // Draw lines to each of the subsequent corners
    for (let i = 1; i < corners.length; i++) {
      this.ctx.lineTo(corners[i].x, corners[i].y);
    }

    // Close the path by connecting the last corner to the first
    this.ctx.closePath();

    // Set fill color
    this.ctx.fillStyle = 'blue';

    // Fill the rectangle
    this.ctx.fill();

    this.ctx.strokeStyle = 'red';
    this.ctx.stroke();

  }

  clear() {
    if (this.ctx) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, 800, 600);
    }
  }

  rotationMatrix(angle: number) {
    return [
      [Math.cos(this.angleToRadianConverter(angle)), -1 * Math.sin(this.angleToRadianConverter(angle))],
      [Math.sin(this.angleToRadianConverter(angle)), Math.cos(this.angleToRadianConverter(angle))]
    ];
  }

  // Function to multiply a 2D rotation matrix by a column vector
  multiplyMatrixVector(matrix: any, vector: any) {
    const x = vector[0];
    const y = vector[1];

    // console.log(x)
    // console.log(y)
    const result = [
      matrix[0][0] * x + matrix[0][1] * y,
      matrix[1][0] * x + matrix[1][1] * y
    ];
    // console.log(matrix[0][0])
    // console.log(result)
    return result;
  }

  // Function to multiply a 2D rotation matrix by a column vector
  multiplyMatrixVectorObject(matrix: number[][], vector: VectorObject2D) {
    const x = vector.i;
    const y = vector.j;

    console.log(x);
    console.log(y);
    console.log(matrix);
    const result = [
      matrix[0][0] * x + matrix[0][1] * y,
      matrix[1][0] * x + matrix[1][1] * y
    ];
    console.log(matrix[1][1]);
    console.log(result);

    return result;
  }

  angleToRadianConverter(angle: number) {
    return Math.PI * (angle / 180);
  }

  drawCoordinateSystem() {

    var arrayPoints = [
      new Point3D(50, 0, 0),
      new Point3D(0, 50, 0),
      new Point3D(0, 0, 50),
      // new Point3D(10, 0, 10),
    ]

    for (var p of arrayPoints) {
      var pointFrameCoordinate = MatrixUtil.getPointInFrameCoordinate(p)
      // this.drawLineParametric(new VectorObject2D(this.width / 2, this.height / 2), pointFrameCoordinate)
      DrawingUtil.drawLine(this.ctx, this.centerOfTheScreen, pointFrameCoordinate)
    }


    DrawingUtil.drawLine(this.ctx, MatrixUtil.getPointInFrameCoordinate(new Point3D(30, 10, 0)),
      MatrixUtil.getPointInFrameCoordinate(new Point3D(30, 30, 0)))

    DrawingUtil.drawLine(this.ctx, MatrixUtil.getPointInFrameCoordinate(new Point3D(30, 30, 0)),
      MatrixUtil.getPointInFrameCoordinate(new Point3D(10, 30, 0)))

    DrawingUtil.drawLine(this.ctx, MatrixUtil.getPointInFrameCoordinate(new Point3D(10, 30, 0)),
      MatrixUtil.getPointInFrameCoordinate(new Point3D(10, 10, 0)))

    DrawingUtil.drawLine(this.ctx, MatrixUtil.getPointInFrameCoordinate(new Point3D(10, 10, 0)),
      MatrixUtil.getPointInFrameCoordinate(new Point3D(30, 10, 0)))



  }
}
