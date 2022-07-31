const gulp = require("gulp");
const sonarqubeScanner = require("sonarqube-scanner");

gulp.task("default", (callback) => {
  sonarqubeScanner(
    {
      serverUrl: "http://localhost:9001",
      token: "",
      options: {},
    },
    callback
  );
});
