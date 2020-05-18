import Component from "@glimmer/component";
import { action } from "@ember/object";
import ENV from "ember-blog/config/environment";
import { inject as service } from "@ember/service";

export default class CommentComponent extends Component {
  @service currentUser;

  @action
  async deleteComment() {
    console.log(ENV.host);
    const response = await fetch(
      `${ENV.host}/comments/${this.args.comment.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      }
    );
    if (response.status === 200) {
      this.args.onDelete();
    } else {
      console.log("oops, something went wrong", response.status);
    }
  }
}
