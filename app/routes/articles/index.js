import Route from "@ember/routing/route";
import ENV from "ember-blog/config/environment";

export default class ArticlesIndexRoute extends Route {
  async model() {
    const response = await fetch(`${ENV.host}/articles`);
    const parsed = await response.json();
    return parsed;
  }
}
