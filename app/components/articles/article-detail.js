import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "ember-blog/config/environment";

export default class ArticleDetailComponent extends Component {
  @service router;

  @tracked displayComments = true;
  @tracked noComments = false;
  @tracked articleComments = [];

  constructor() {
    super(...arguments);

    this.getComments(this.args.article.id);
  }

  get article() {
    this.noComments = this.articleComments.length === 0;
    return this.args.article;
  }

  async getComments(articleId) {
    try {
      const response = await fetch(
        `${ENV.host}/articles/${articleId}/comments`
      );
      const parsed = await response.json();
      this.articleComments = parsed;
    } catch (e) {
      console.log("There was an error getting comments", e);
    }
  }

  @action
  hideComments() {
    return (this.displayComments = !this.displayComments);
  }

  @action
  commentSaved() {
    this.getComments(this.args.article.id);
  }

  @action
  commentDeleted() {
    this.getComments(this.args.article.id);
  }

  @action
  async deleteArticle() {
    const response = await fetch(
      `${ENV.host}/articles/${this.args.article.id}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      this.router.transitionTo("articles.index");
    } else {
      console.log("something went wrong", response.status);
    }
  }
}
