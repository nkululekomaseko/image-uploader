module.exports = {
  apps: [
    {
      name: "image-uploader",
      script: "/dist/index.js",
      watch: false,
      force: true,
      env: {
        PORT: 3000,
        NODE_ENV: "production",
      },
    },
  ],
};
