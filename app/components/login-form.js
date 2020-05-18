import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "ember-blog/config/environment";

export default class SigninFormComponent extends Component {
  @service router;
  @service currentUser;

  @tracked draft = {};

  @action
  inputUpdated({ target: { name, value } }) {
    this.draft = { ...this.draft, [name]: value };
  }

  @action
  async submitClicked(event) {
    event.preventDefault();

    const { email, password } = this.draft;

    try {
      const response = await fetch(`${ENV.host}/sessions`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            email,
            password,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      });

      if (response.ok) {
        const { token } = await response.json();
        this.currentUser.token = token;
        this.router.transitionTo("home");
      } else {
        //! Add some type of error handling
        console.log("something went wrong", response);
      }
    } catch (e) {
      console.log("There was an error.", e);
    }
  }
}
