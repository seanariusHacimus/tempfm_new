/**
 * Looks the 3D logo can take. The index is what Logo3DHandle.setStyle() and
 * the `logoStyle` prop expect. Kept apart from logo3d.ts so that listing the
 * looks does not pull three.js into a page.
 */
export const LOGO_STYLES = [
    { id: "chrome", name: "Хром" },
    { id: "wings", name: "Крылья" },
    { id: "orbit", name: "Орбита" },
    { id: "neon", name: "Неон" },
    { id: "ember", name: "Жар" },
    { id: "retro", name: "Ретро" },
] as const;
