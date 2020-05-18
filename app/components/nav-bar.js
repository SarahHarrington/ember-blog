import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { action } from "@ember/object";
import ENV from "ember-blog/config/environment";

export default class NavBarComponent extends Component {
  @service currentUser;
  @service router;

  get loggedIn() {
    return !!this.currentUser.token;
  }

  @action
  async logOutClicked() {
    try {
      const response = await fetch(`${ENV.host}/sessions/me`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      });

      if (response.ok) {
        this.currentUser.token = null;
        //! Update this route later?
        this.router.transitionTo("login");
      } else {
        //! Add some type of error handling
        console.log("something went wrong", response);
      }
    } catch (e) {
      console.log("There was an error.", e);
    }
  }
}
