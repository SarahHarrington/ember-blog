import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
import ENV from "ember-blog/config/environment";

export default class HomeRoute extends Route {
  @service currentUser;

  async model() {
    const response = await fetch(`${ENV.host}/users/me`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${this.currentUser.token}`,
      },
    });
    const user = await response.json();
    Object.assign(this.currentUser, user);
    return user;
  }
}
