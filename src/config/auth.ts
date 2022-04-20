export default {
  jwt: {
    secret: process.env.APP_SECRET || '95bc3f4d2e3064087d151c62a588d322',
    expiresIn: '1d',
  },
};
