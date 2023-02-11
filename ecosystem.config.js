module.exports = {
  apps: [
    {
      name: "image-uploader",
      script: "./dist/app.js",
      watch: false,
      force: true,
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
