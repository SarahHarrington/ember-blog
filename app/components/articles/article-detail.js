import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ArticleDetailComponent extends Component {
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
    const response = await fetch(
      `http://localhost:3000/api/articles/${articleId}/comments`
    );
    const parsed = await response.json();
    this.articleComments = parsed;
  }

  @action
  hideComments() {
    return (this.displayComments = !this.displayComments);
  }
}
