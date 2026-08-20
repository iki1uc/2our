export function SYN_CORE(mia, echo, form){
    return {
        mode: "sync",
        lock: (mia.fusion + echo.resonance) % 100,
        stable: mia.fusion > 50 && echo.state === "loud",
        etage: form.etage,
        modul: form.modul,
        aufgabe: form.aufgabe,
        pulse: form.pulse,
        warp: form.warp,
        drift: form.drift,
        angle: form.angle
    };
}
