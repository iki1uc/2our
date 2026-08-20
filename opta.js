export class Opta {
    constructor(vector){
        this.vector = vector;
    }

    optimize(){
        const m = this.vector.magnitude();
        return m > 100 ? "hyper-flight" : "soft-flight";
    }

    bend(k){
        return this.vector.curvature(k);
    }

    fly(k){
        return this.vector.fly(k);
    }
}
