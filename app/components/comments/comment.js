import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class CommentComponent extends Component {
  @action async deleteComment() {
    console.log("delete clicked");
    console.log(this.args.comment.id);
    console.log(this.args.comment.article_id);

    const response = await fetch(
      `http://localhost:3000/api/comments/${this.args.comment.id}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          comment: {
            article_id: this.args.article_id,
            id: this.args.comment.id,
          },
        }),
      }
    );
    console.log(response);
    if (response.status === 200) {
      console.log("render the stuff");
      this.args.onDelete();
    } else {
      console.log("oops, something went wrong");
    }
  }
}
