import { Plane, PlaneFactory, Point3D, VectorObject2D, VectorObject3D } from "../canvas/canvas.model";

export class MatrixUtil {
    static unitVector(arg0: VectorObject3D) {
        var v1Magnitude = MatrixUtil.vectorMagnitude3D(arg0)
        console.log(v1Magnitude)
        return new VectorObject3D(this.fixFloatAfter4(arg0.i / v1Magnitude),
            this.fixFloatAfter4(arg0.j / v1Magnitude),
            this.fixFloatAfter4(arg0.k / v1Magnitude))
    }

    static twoPointToVector3D(point1: Point3D, point2: Point3D): VectorObject3D {
        return new VectorObject3D(this.fixFloatAfter4(point2.x - point1.x), this.fixFloatAfter4(point2.y - point1.y), this.fixFloatAfter4(point2.z - point1.z))
    }

    static crossProduct(v1: VectorObject3D, v2: VectorObject3D): VectorObject3D {
        const [x1, y1, z1] = [v1.i, v1.j, v1.k];
        const [x2, y2, z2] = [v2.i, v2.j, v2.k];

        const crossX = y1 * z2 - z1 * y2;
        const crossY = z1 * x2 - x1 * z2;
        const crossZ = x1 * y2 - y1 * x2;

        return new VectorObject3D(this.fixFloatAfter4(crossX), this.fixFloatAfter4(crossY), this.fixFloatAfter4(crossZ));
    }

    static dotProduct(v1: VectorObject3D, v2: VectorObject3D): number {
        return v1.i * v2.i + v1.j * v2.j + v1.k * v2.k
    }

    static vectorMagnitude3D(v: VectorObject3D) {
        return this.fixFloatAfter4(Math.sqrt(v.i * v.i + v.j * v.j + v.k * v.k))
    }

    static vectorToVectorProjection(u1: VectorObject3D, v1: VectorObject3D): VectorObject3D {
        // var u1 = new VectorObject3D(-1,4,0)
        // var v1 = new VectorObject3D(2,7,0)

        var dotP = MatrixUtil.dotProduct(u1, v1)
        // console.log(dotP)

        var v1Magnitude = MatrixUtil.vectorMagnitude3D(v1)
        // console.log(v1Magnitude)

        var carpan = dotP / (v1Magnitude * v1Magnitude)
        var projUoverV = new VectorObject3D(carpan * v1.i, carpan * v1.j, carpan * v1.k)
        // console.log(projUoverV)
        projUoverV = new VectorObject3D(this.fixFloatAfter4(projUoverV.i), this.fixFloatAfter4(projUoverV.j), this.fixFloatAfter4(projUoverV.k))
        return projUoverV
    }

    static getPlaneEquationFrom3Point(p1: Point3D, p2: Point3D, p3: Point3D) {
        // https://www.youtube.com/watch?v=rL9UXzZYYo4&t=103s

        const vector3D1 = MatrixUtil.twoPointToVector3D(p1, p2);
        const vector3D2 = MatrixUtil.twoPointToVector3D(p1, p3)

        var normalVector = MatrixUtil.crossProduct(vector3D1, vector3D2);

        return PlaneFactory.planeWithNormalVectorAndPoint(normalVector, p1)
    }

    static vectorCikarmasi3D(u: VectorObject3D, v: VectorObject3D) {

        return new VectorObject3D(u.i - v.i, u.j - v.j, u.k - v.k)
    }

    static vectorToplama3D(u: VectorObject3D, v: VectorObject3D) {

        return new VectorObject3D(u.i + v.i, u.j + v.j, u.k + v.k)
    }

    static pointToPostionVector(point: Point3D): VectorObject3D {
        return new VectorObject3D(this.fixFloatAfter4(point.x), this.fixFloatAfter4(point.y), this.fixFloatAfter4(point.z))
    }


    // projection.ts
    static projectPointOntoPlane(x: number, y: number, z: number, planeX: number, planeY: number, planeZ: number): [number, number, number] {
        const n = Math.sqrt(planeX * planeX + planeY * planeY + planeZ * planeZ);
        console.log(planeX, planeY, planeZ, n)
        const d = planeX * planeX + planeY * planeY + planeZ * planeZ;
        const scale = d / (n * n);

        const projectedX = scale * planeX;
        const projectedY = scale * planeY;
        const projectedZ = scale * planeZ;

        return [projectedX, projectedY, projectedZ];
    }

    static fixFloatAfter4(number: number): number {
        return parseFloat(number.toFixed(4))
    }

    static changeFrameForScreen(coordinate: VectorObject2D) {
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

    static multiplyMatrixVectorObject(matrix: number[][], vector: VectorObject2D) {
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

    static getPlane505050(): Plane {
        var planePointx = new Point3D(50, 0, 0)
        var planePointy = new Point3D(0, 50, 0)
        var planePointz = new Point3D(0, 0, 50)

        var planeEquation = MatrixUtil.getPlaneEquationFrom3Point(planePointx, planePointy, planePointz)

        return planeEquation
    }

    static getProjectedCoordinates(pointToProject: Point3D, pointOnPlaneToBeNewOrigin: Point3D): VectorObject3D {

        // ! 1. adim origin(ya da baska nokta) ile secilen plane noktasi arasindaki vectoru bul
        var planePointToPointToProject = MatrixUtil.twoPointToVector3D(pointOnPlaneToBeNewOrigin, pointToProject)
        // ! 2. normal vectorunu izdusumunu bul
        var izdusumOntoNormal = MatrixUtil.vectorToVectorProjection(planePointToPointToProject, this.getPlane505050().getNormalVector())
        // ! 3. v-izdusum cikarmasi yap - ilk secilen plane noktasindan izdusumune olan vector. yani orjin diyebliriz ilk secilen noktaya
        var sonuc = MatrixUtil.vectorCikarmasi3D(planePointToPointToProject, izdusumOntoNormal)
        return sonuc;
    }

    static get2Dfrom3Dpoint(pointToProject: Point3D, pointOnPlaneToBeNewOrigin: Point3D, eyPoint: Point3D) {

        var ey3d = MatrixUtil.twoPointToVector3D(pointOnPlaneToBeNewOrigin, eyPoint)
        ey3d = MatrixUtil.unitVector(ey3d)

        var ex3d = MatrixUtil.crossProduct(ey3d, this.getPlane505050().getNormalVector())
        ex3d = MatrixUtil.unitVector(ex3d)
        var dotEx = MatrixUtil.dotProduct(ex3d, this.twoPointToVector3D(pointOnPlaneToBeNewOrigin, pointToProject))
        var dotEy = MatrixUtil.dotProduct(ey3d, this.twoPointToVector3D(pointOnPlaneToBeNewOrigin, pointToProject))
        return new VectorObject2D(dotEx, dotEy)
    }
    static getPointInFrameCoordinate(pointToTransformation: Point3D) {
        var pointOnPlaneToBeNewOrigin = new Point3D(50 / 3, 50 / 3, 50 / 3); //50/Math.sqrt(3)=28.867513459481287
        var pointAsY = new Point3D(0, 0, 50);

        var projectedPointAsVector = MatrixUtil.getProjectedCoordinates(pointToTransformation, pointOnPlaneToBeNewOrigin)
        var pointGlobalCoordinate = MatrixUtil.get2Dfrom3Dpoint(
            new Point3D(projectedPointAsVector.i, projectedPointAsVector.j, projectedPointAsVector.k),
            pointOnPlaneToBeNewOrigin,
            pointAsY
        )
        var pointInFrameCoordinate = MatrixUtil.changeFrameForScreen(pointGlobalCoordinate)
        return pointInFrameCoordinate
    }
}