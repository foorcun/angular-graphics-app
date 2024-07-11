import { MatrixUtil } from "../utils/matrix.util";

export class Point3D{
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}



export class VectorObject2D {
  i: number;
  j: number;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }
}


export class VectorObject3D {
  i: number;
  j: number;
  k: number;

  constructor(i: number, j: number, k: number) {
    this.i = i;
    this.j = j;
    this.k = k;
  }
}


export class Plane{
  A: number;
  B: number;
  C: number;
  D: number;
  
  constructor(A:number,B:number,C:number,D:number){
    this.A =A;
    this.B=B;
    this.C=C;
    this.D =D;
  }

  getNormalVector(){
    // return new VectorObject3D(this.A,this.B,this.C)
    return MatrixUtil.unitVector(new VectorObject3D(this.A,this.B,this.C))
  }
}

export class PlaneFactory{
  static planeWithNormalVectorAndPoint(normalVector: VectorObject3D, point: Point3D){
    var A = normalVector.i;
    var B = normalVector.j;
    var C = normalVector.k;

    var D = A*point.x + B*point.y + C*point.z;

    return new Plane(A,B,C,D);
  }
}