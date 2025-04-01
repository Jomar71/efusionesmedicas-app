export const anestesicos = {
  midazolam: {
    nombre: "Midazolam",
    dosisMin: 0.1,
    dosisMax: 0.3,
    unidad: "mg/kg/h",
    k: 1,
  },
  fentanil: {
    nombre: "Fentanil",
    dosisMin: 1,
    dosisMax: 3,
    unidad: "mcg/kg/min",
    k: 10,
  },
  remifentanil: {
    nombre: "Remifentanil",
    dosisMin: 0.05,
    dosisMax: 0.3,
    unidad: "mcg/kg/min",
    k: 20,
  },
  dexmedetomidina: {
    nombre: "Dexmedetomidina",
    dosisMin: 0.3,
    dosisMax: 1.2,
    unidad: "mcg/kg/min",
    k: 4,
  },
  propofol: {
    nombre: "Propofol",
    dosisMin: 1,
    dosisMax: 4,
    unidad: "mg/kg/h",
    k: 10,
  },
  ketamina: {
    nombre: "Ketamina",
    dosisMin: 5,
    dosisMax: 16,
    unidad: "mcg/kg/min",
    k: 2,
  },
};
