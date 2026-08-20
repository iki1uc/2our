// AIR6D_MOVE.js
// 6D AIRSCHACH Move-Operator

import { Vector } from "./vector.js";
import { Opta } from "./opta.js";
import { FORM_ENGINE } from "./FORM_ENGINE.js";
import { FORM_MATRIX } from "./FORM_MATRIX.js";
import { FLX_CORE } from "./FLX_CORE.js";
import { VEC_CORE } from "./VEC_CORE.js";
import { SYN_CORE } from "./syn.js"; // dein sync-Modul

export function AIR6D_MOVE(mia, echo, coreMatrix, t = 0){
    
    // 1. Vektor-Achse (Pulse/Warp/Charge)
    const vec = new Vector(
        mia.pulse,
        echo.warp,
        mia.charge
    );

    // 2. Flexions-Achse (Krümmung)
    const flx = FLX_CORE({
        amplitude: vec.x,
        resonance: echo.resonance,
        origin: vec.z
    });

    // 3. Form-Achse (Etagen)
    const matrix = FORM_MATRIX(coreMatrix);
    const form = FORM_ENGINE(matrix, t);

    // 4. Synchronisations-Achse
    const syn = SYN_CORE(mia, echo, form);

    // 5. Opta (Flug)
    const opt = new Opta(vec);

    // 6. 6D Move-Output
    return {
        mode: "AIR6D",
        vector: {
            x: vec.x,
            y: vec.y,
            z: vec.z,
            magnitude: vec.magnitude()
        },
        flex: {
            bend: flx.bend,
            curve: flx.curve,
            flight: flx.flight
        },
        form: {
            etage: form.etage,
            modul: form.modul,
            aufgabe: form.aufgabe,
            pulse: form.pulse,
            warp: form.warp,
            drift: form.drift,
            angle: form.angle
        },
        sync: {
            lock: syn.lock,
            stable: syn.stable
        },
        flight: opt.optimize(),
        time: t
    };
}
