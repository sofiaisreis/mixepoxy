type ParamType = "totalWeight" | "resin" | "hardener";

export function getTotalWeight(
  propSelected: number,
  type: Exclude<ParamType, "totalWeight">,
  coef: number
) {
  switch (type) {
    case "resin":
      return Math.round(propSelected * (coef + 1) * 100) / 100;
    case "hardener":
      return Math.round(((propSelected * (coef + 1)) / coef) * 100) / 100;
    default:
      throw new Error("oops!");
  }
}

export function getResin(
  propSelected: number,
  type: Exclude<ParamType, "resin">,
  coef: number
) {
  switch (type) {
    case "totalWeight":
      return Math.round((propSelected / (coef + 1)) * 100) / 100;
    case "hardener":
      return Math.round((propSelected / coef) * 100) / 100;
    default:
      throw new Error("oops!");
  }
}

export function getHardener(
  propSelected: number,
  type: Exclude<ParamType, "hardener">,
  coef: number
) {
  switch (type) {
    case "totalWeight":
      return Math.round((propSelected / (coef + 1)) * coef * 100) / 100;
    case "resin":
      return Math.round(propSelected * coef * 100) / 100;
    default:
      throw new Error("oops!");
  }
}
