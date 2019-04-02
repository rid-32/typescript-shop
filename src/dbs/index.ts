import mongobd from "./mongodb";

const init = () => Promise.all([mongobd]);

export default { init };
