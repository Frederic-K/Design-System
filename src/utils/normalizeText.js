export const stripAccents = (s = "") => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export const norm = (s = "") => stripAccents(s).toLowerCase().trim()
