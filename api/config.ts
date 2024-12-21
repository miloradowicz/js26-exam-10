const config = {
  rootPath: __dirname,
  publicPath: 'public',
  express: {
    port: 8000,
  },
  mysql: {
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'miloradowicz_exam10',
    },
  },
};

export default config;
