import Component from "@glimmer/component";
import { action } from "@ember/object";
import ENV from "ember-blog/config/environment";

export default class CommentComponent extends Component {
  @action
  async deleteComment() {
    console.log(ENV.host);
    const response = await fetch(
      `${ENV.host}/comments/${this.args.comment.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      this.args.onDelete();
    } else {
      console.log("oops, something went wrong", response.status);
    }
  }
}
