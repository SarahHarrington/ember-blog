import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import ENV from "ember-blog/config/environment";

export default class NewCommentComponent extends Component {
  @tracked commentBody;
  @tracked commenter;

  @action
  async saveComment() {
    try {
      const createdComment = await fetch(`${ENV.host}/comments/`, {
        method: "POST",
        body: JSON.stringify({
          comment: {
            commenter: this.commenter,
            body: this.commentBody,
            article_id: this.args.articleId,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      });
      this.args.onSave(createdComment);
      this.clearForm();
    } catch (e) {
      console.log("error saving comment", e);
    }
  }

  clearForm() {
    this.commentBody = null;
    this.commenter = null;
  }
}
