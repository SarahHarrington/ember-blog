import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route("home");
  this.route("articles", function () {
    this.route("new");
    this.route("show", { path: "/:article_id" });
  });
  this.route("comments");
  this.route("signup");
  this.route("login");
});
