import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class CommentComponent extends Component {
  @action
  async deleteComment() {
    const response = await fetch(
      `http://localhost:3000/api/comments/${this.args.comment.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      this.args.onDelete();
    } else {
      console.log("oops, something went wrong");
    }
  }
}
