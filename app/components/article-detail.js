import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ArticleDetailComponent extends Component {
  @tracked displayComments = false;

  get article() {
    console.log(this.args.article);
    return this.args.article;
  }

  @action
  showComments() {
    articleComments = this.getComments();
    return (this.displayComments = !this.displayComments);
  }

  @action
  async getComments() {
    const response = await fetch(
      `http://localhost:3000/api/articles/${this.args.article.id}/comments`
    );
    const parsed = await response.json();
    console.log(parsed);
    return parsed;
  }
}
