import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

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
        `http://localhost:3000/api/articles/${articleId}/comments`
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
    console.log(this.args.article.id);
    const response = await fetch(
      `http://localhost:3000/api/articles/${this.args.article.id}`,
      {
        method: "DELETE",
      }
    );
    // console.log(response.status);
    if (response.status === 200) {
      console.log("delete successful");
      this.router.transitionTo("articles.index");
    } else {
      console.log("something went wrong", response.status);
    }
  }
}
