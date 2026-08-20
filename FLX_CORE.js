import { Vector } from "./vector.js";
import { Opta } from "./opta.js";

export function FLX_CORE(echo){
    const vec = new Vector(echo.amplitude, echo.resonance, echo.origin);
    const opt = new Opta(vec);

    return {
        mode: "flex",
        bend: opt.bend(echo.resonance),
        curve: Math.tan(echo.resonance),
        flight: opt.fly(echo.resonance)
    };
}
