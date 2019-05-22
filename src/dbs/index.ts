import mongobd from './mongodb';

const init = (): Promise<object[]> => Promise.all([mongobd]);

export default { init };
