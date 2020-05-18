import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import ENV from "ember-blog/config/environment";

export default class ArticleFormComponent extends Component {
  @service router;
  @service currentUser;
  //set the form values here
  @tracked title;
  @tracked post;
  @tracked createdArticle = null;

  @action
  async savePost() {
    try {
      await fetch(`${ENV.host}/articles`, {
        method: "POST",
        body: JSON.stringify({
          article: {
            title: this.title,
            text: this.post,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${this.currentUser.token}`,
        },
      });
      this.router.transitionTo("articles.index");
    } catch (e) {
      console.log("There was an error.", e);
    }
  }
}
