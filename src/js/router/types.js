/**
 * @typedef {object} RouteDefinition
 * @property {string} path
 * @property {() => Promise<{ default: string }>} template
 * @property {() => void | Promise<void>} [afterRender]
 */

export {};
