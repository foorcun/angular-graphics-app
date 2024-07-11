
import { Plane, PlaneFactory, Point3D, VectorObject2D, VectorObject3D } from '../canvas/canvas.model';
import { MatrixUtil } from './matrix.util';

describe('MatrixUtil', () => {
  it('create an vector from 2 point3D', () => {
    const vector3D = MatrixUtil.twoPointToVector3D(new Point3D(2, 1, 4), new Point3D(4, -2, 7));
    // console.log(vector3D)
    // console.log("console deneme")
    expect(vector3D).toEqual(new VectorObject3D(2, -3, 3)); // toEqual deger check ediyor. toBe exact check ediyor
  });

  it("get Plane equation from 3 Point3D", () => {
    // https://www.youtube.com/watch?v=rL9UXzZYYo4&t=103s
    // points 2,1,4; 4,-2,7; 5,3,-2

    const vector3D1 = MatrixUtil.twoPointToVector3D(new Point3D(2, 1, 4), new Point3D(4, -2, 7));
    expect(vector3D1).toEqual(new VectorObject3D(2, -3, 3))
    const vector3D2 = MatrixUtil.twoPointToVector3D(new Point3D(2, 1, 4), new Point3D(5, 3, -2));
    console.log(vector3D2)
    // expect(vector3D2).toEqual(new VectorObject3D(3,2,-6))
    var normalVector = MatrixUtil.crossProduct(vector3D1, vector3D2);
    // console.log(normalVector)
    expect(normalVector).toEqual(new VectorObject3D(12, 21, 13))

    var planee = PlaneFactory.planeWithNormalVectorAndPoint(normalVector, new Point3D(2, 1, 4))
    console.log(planee)
    expect(planee).toEqual(MatrixUtil.getPlaneEquationFrom3Point(new Point3D(2, 1, 4), new Point3D(4, -2, 7), new Point3D(5, 3, -2)))

  })

  it("get Plane equation from 3 Point3D for (50,0,0), (0,50,0), (0,0,50)", () => {
    // https://www.youtube.com/watch?v=rL9UXzZYYo4&t=103s
    // points 2,1,4; 4,-2,7; 5,3,-2

    const vector3D1 = MatrixUtil.twoPointToVector3D(new Point3D(50, 0, 0), new Point3D(0, 50, 0));
    console.log(vector3D1)
    // expect(vector3D1).toEqual(new VectorObject3D(2,-3,3))
    const vector3D2 = MatrixUtil.twoPointToVector3D(new Point3D(50, 0, 0), new Point3D(0, 0, 50));
    console.log(vector3D2)
    // expect(vector3D2).toEqual(new VectorObject3D(3,2,-6))
    var normalVector = MatrixUtil.crossProduct(vector3D1, vector3D2);
    console.log(normalVector)
    // expect(normalVector).toEqual(new VectorObject3D(12,21,13))

    var planee = PlaneFactory.planeWithNormalVectorAndPoint(normalVector, new Point3D(2, 1, 4))
    console.log(planee)
    // plane eq. sadelectirlmis hali = 1,1,1,7
    expect(planee).toEqual(MatrixUtil.getPlaneEquationFrom3Point(new Point3D(50, 0, 0), new Point3D(0, 50, 0), new Point3D(0, 0, 50)))
  })

  it("vektorun vectore is dusumu", () => {
    // https://youtu.be/xSu-0xcRBo8?si=U3LB00O29L2WJJUs

    var u1 = new VectorObject3D(-1, 4, 0)
    var v1 = new VectorObject3D(2, 7, 0)

    var dotP = MatrixUtil.dotProduct(u1, v1)
    console.log(dotP)
    expect(dotP).toBe(26)

    var v1Magnitude = MatrixUtil.vectorMagnitude3D(v1)
    console.log(v1Magnitude)

    var carpan = dotP / (v1Magnitude * v1Magnitude)
    var projUoverV = new VectorObject3D(carpan * v1.i, carpan * v1.j, carpan * v1.k)
    console.log(projUoverV)

    expect(projUoverV).toEqual(MatrixUtil.vectorToVectorProjection(u1, v1))

  })

  it("origin noktasinin plane e iz dusumu", () => {

    var planePointx = new Point3D(50, 0, 0)
    var planePointy = new Point3D(0, 50, 0)
    var planePointz = new Point3D(0, 0, 50)
    var point = new Point3D(0, 0, 0)

    // plane eq. from 3 point
    var plane = MatrixUtil.getPlaneEquationFrom3Point(planePointx, planePointy, planePointz)
    console.log(plane)
    plane = new Plane(1, 1, 1, 50)
    // 1. adim Plane origin ile secilen plane noktasi arasindaki vectoru bul
    var v = MatrixUtil.twoPointToVector3D(planePointx, point)
    console.log(v)

    // 2. normal vectorunu izdusumunu bul
    var izdusum = MatrixUtil.vectorToVectorProjection(v, plane.getNormalVector())
    console.log(plane.getNormalVector())
    console.log(izdusum)
    expect(izdusum.i).toBeCloseTo(-16.66666); // -50 / 3

    // 3. v-izdusum cikarmasi yap - ilk secilen plane noktasindan izdusumune olan vector.
    var sonuc = MatrixUtil.vectorCikarmasi3D(v, izdusum)
    // console.log(MatrixUtil.vectorCikarmasi3D(izdusum, v))
    console.log(sonuc)
  })

  it("origin noktasinin plane e iz dusumu2", () => {

    var planePointx = new Point3D(50, 0, 0)
    var planePointy = new Point3D(0, 50, 0)
    var planePointz = new Point3D(0, 0, 50)
    // var pointToProject = new Point3D(0, 0, 0)
    var pointToProject = new Point3D(50, 0, 0)
    // var point = new Point3D(0, 50, 0)
    // var point = new Point3D(0, 0, 150)

    // plane eq. from 3 point
    var planeEquation = MatrixUtil.getPlaneEquationFrom3Point(planePointx, planePointy, planePointz)
    // plane = new Plane(1, 1, 1, 150)
    // planeEquation = new Plane(1, 1, 1, 50)
    console.log(planeEquation)
    // ! 1. adim origin(ya da baska nokta) ile secilen plane noktasi arasindaki vectoru bul
    // var pointOnPlaneToBeNewOrigin = new Point3D(0,50,0); //50/Math.sqrt(3)=28.867513459481287
    // var pointOnPlaneToBeNewOrigin = new Point3D(0,50,0); //50/Math.sqrt(3)=28.867513459481287
    var pointOnPlaneToBeNewOrigin = new Point3D(50 / 3, 50 / 3, 50 / 3); //50/Math.sqrt(3)=28.867513459481287
    var planePointToPointToProject = MatrixUtil.twoPointToVector3D(pointOnPlaneToBeNewOrigin, pointToProject)

    // var v = MatrixUtil.twoPointToVector3D(new Point3D(0,0,150), point)

    // ! burdan baslangici plane ustu nokta olan, bitisi hedef nokta olan v vectoru cikiyor
    // var v = MatrixUtil.twoPointToVector3D(new Point3D(0,0,50), point)
    // var v = MatrixUtil.twoPointToVector3D(planePointx, point)
    console.log(planePointToPointToProject)
    // pointToProject =  pointOnPlaneToBeNewOrigin + planePointToGoalPoint

    // ! 2. normal vectorunu izdusumunu bul
    var izdusumOntoNormal = MatrixUtil.vectorToVectorProjection(planePointToPointToProject, planeEquation.getNormalVector())
    console.log(planeEquation.getNormalVector())
    console.log(izdusumOntoNormal)
    // expect(izdusum.i).toBeCloseTo(-16.66666); // -50 / 3

    // console.log(MatrixUtil.vectorCikarmasi3D(new VectorObject3D(50,0,0), izdusum))
    console.log(MatrixUtil.vectorToplama3D(
      MatrixUtil.pointToPostionVector(pointOnPlaneToBeNewOrigin), planePointToPointToProject))
    // pointToProject =  pointOnPlaneToBeNewOrigin + planePointToGoalPoint


    // ! 3. v-izdusum cikarmasi yap - ilk secilen plane noktasindan izdusumune olan vector. yani orjin diyebliriz ilk secilen noktaya
    var sonuc = MatrixUtil.vectorCikarmasi3D(planePointToPointToProject, izdusumOntoNormal)
    // console.log(MatrixUtil.vectorCikarmasi3D(izdusum, v))
    console.log(sonuc)

    console.log(MatrixUtil.vectorToplama3D(
      MatrixUtil.pointToPostionVector(pointOnPlaneToBeNewOrigin), sonuc))

      // method and sonuc kiyas
      console.log(MatrixUtil.getProjectedCoordinates(pointToProject,pointOnPlaneToBeNewOrigin))
      expect(sonuc).toEqual(MatrixUtil.getProjectedCoordinates(pointToProject,pointOnPlaneToBeNewOrigin))
  })


  it('should correctly project the point (0, 0, 0) onto the plane x=50, y=50, z=50', () => {
    const point = [0, 0, 0];
    const plane = [50, 50, 50];
    const expectedProjection = [50 / Math.sqrt(3), 50 / Math.sqrt(3), 50 / Math.sqrt(3)];

    const result = MatrixUtil.projectPointOntoPlane(point[0], point[1], point[2], plane[0], plane[1], plane[2]);

    expect(result[0]).toBeCloseTo(expectedProjection[0]);
    expect(result[1]).toBeCloseTo(expectedProjection[1]);
    expect(result[2]).toBeCloseTo(expectedProjection[2]);
  });

  it("plane ustundeki noktanin 3d coordinatindan 2d gecmek documentation", () => {
    // link: https://www.baeldung.com/cs/3d-point-2d-plane
    console.log("baslangic")
    var ey3d = new VectorObject3D(0,-0.707,0.707)
    console.log(ey3d)

    var ex3d = new VectorObject3D(0,0.707,0.707)
    console.log(ex3d)

    var izdusum0_1_0 = new VectorObject3D(0,1,0)

    var dotEx = MatrixUtil.dotProduct(ex3d, izdusum0_1_0)
    console.log(dotEx)

    expect(dotEx).toBeCloseTo(0.707); 
    
    var dotEy = MatrixUtil.dotProduct(ey3d, izdusum0_1_0)
    console.log(dotEy)
    expect(dotEy).toBeCloseTo(-0.707); 
  })


  it("plane ustundeki noktanin 3d coordinatindan 2d gecmek Deneme", () => {
    console.log("baslangic")
    var newOriginIn3d = new Point3D(50 / 3, 50 / 3, 50 / 3)
    var ey3d = MatrixUtil.twoPointToVector3D(newOriginIn3d, new Point3D(0, 0, 50))
    console.log(ey3d)
    ey3d = MatrixUtil.unitVector(ey3d)
    console.log(ey3d)

    var plane = new Plane(1, 1, 1, 50)

    var ex3d = MatrixUtil.crossProduct(ey3d, plane.getNormalVector())
    console.log(plane.getNormalVector())
    console.log(ex3d)
    ex3d = MatrixUtil.unitVector(ex3d)
    console.log(ex3d)

    var izdusum50_0_0 = new VectorObject3D(33.3333, -16.6667, -16.6667);

    var dotEx = MatrixUtil.dotProduct(ex3d, izdusum50_0_0)
    console.log(dotEx)

    
    var dotEy = MatrixUtil.dotProduct(ey3d, izdusum50_0_0)
    console.log(dotEy)

    // chage Frame for Screen
    // var frameForCenter = MatrixUtil.changeFrameForScreen(new VectorObject2D(dotEx,dotEy))

    var frameAxes = MatrixUtil.changeFrameForScreen(new VectorObject2D(dotEx,dotEy))
    console.log(frameAxes)
  })


  it("unit vector test",()=>{
    // link: https://byjus.com/maths/unit-vector/
    var plane = new Plane(12, -3, -4, 50)
    var normalVector = plane.getNormalVector()
    console.log(normalVector)
    expect(normalVector.i).toBeCloseTo(0.9231);
    expect(normalVector.j).toBeCloseTo(-0.2308);
    expect(normalVector.k).toBeCloseTo(-0.3077);

    var plane = new Plane(1, 1, 1, 50)
    var normalVector = plane.getNormalVector()
    console.log(normalVector)
  })
});
