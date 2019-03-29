module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://54.71.122.183:8080/SS_Team3",
        changeOrigin: true
      }
    }
  }
};
