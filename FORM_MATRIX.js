export function FORM_MATRIX(core){
  return core.map((row, i) => ({
    index: i,
    etage: row.etage,
    modul: row.modul,
    aufgabe: row.aufgabe,
    depth: i * 0.33,
    pulse: Math.sin(i * 0.25),
    warp: Math.cos(i * 0.18),
    angle: (i * 36) % 360
  }));
}
