export function FORM_ENGINE(matrix, t){
  const idx = Math.floor((Math.sin(t) + 1) * (matrix.length / 2));
  const row = matrix[Math.min(idx, matrix.length - 1)];

  return {
    etage: row.etage,
    modul: row.modul,
    aufgabe: row.aufgabe,
    pulse: row.pulse * Math.sin(t),
    warp: row.warp * Math.cos(t),
    drift: row.depth * Math.sin(t * 0.5),
    angle: row.angle
  };
}
