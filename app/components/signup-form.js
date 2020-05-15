import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "ember-blog/config/environment";

export default class SignupFormComponent extends Component {
  @service router;

  @tracked draft = {};

  @action
  inputUpdated(type, value) {
    this.draft[type] = value;
  }

  @action
  async submitClicked(event) {
    event.preventDefault();

    const { name, email, password, password_confirmation } = this.draft;

    try {
      const response = await fetch(`${ENV.host}/users`, {
        method: "POST",
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            password_confirmation,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(response);
      if (response.status === 200) {
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
