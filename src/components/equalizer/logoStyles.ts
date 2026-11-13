/**
 * Looks the logo can take. The index is what Logo3DHandle.setStyle() and the
 * `logo` setting expect. Kept apart from logo3d.ts so that listing the looks
 * does not pull three.js into a page.
 */
export const LOGO_STYLES = [
    { id: "simple", name: "Простой" },
    { id: "chrome", name: "Хром" },
    { id: "wings", name: "Крылья" },
    { id: "orbit", name: "Орбита" },
    { id: "neon", name: "Неон" },
    { id: "ember", name: "Жар" },
    { id: "retro", name: "Ретро" },
] as const;

/** What the logo is made of: the fill of the simple one, the metal of the 3D ones. */
export const LOGO_TINTS = [
    { id: "silver", name: "Белый", color: "#ffffff" },
    { id: "gold", name: "Золото", color: "#ffc76a" },
    { id: "dark", name: "Тёмный", color: "#30343b" },
    { id: "accent", name: "В цвет фона", color: null },
] as const;
