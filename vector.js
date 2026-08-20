export class Vector {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    magnitude(){
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    curvature(k){
        return {
            cx: this.x * Math.cos(k),
            cy: this.y * Math.sin(k),
            cz: this.z * Math.tan(k)
        };
    }

    fly(k){
        const c = this.curvature(k);
        return new Vector(c.cx, c.cy, c.cz);
    }
}
