import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import ENV from "ember-blog/config/environment";

export default class ArticlesIndexRoute extends Route {
  @service currentUser;
  async model() {
    const response = await fetch(`${ENV.host}/articles`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${this.currentUser.token}`,
      },
    });
    const parsed = await response.json();
    return parsed;
  }
}
