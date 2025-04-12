module.exports = {
    apps: [{
      name: 'myapp',
      script: 'src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DB_HOST: 'localhost',
        DB_USER: 'myappuser',
        DB_PASSWORD: 'securepassword',
        DB_NAME: 'myappdb',
        DB_PORT: 5432
      }
    }]
  };
  