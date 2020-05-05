import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
// import { action } from "@ember/object";

export default class ArticleComponent extends Component {
  @tracked showMore = false;
  @tracked articleText;

  get article() {
    this.shortText;
    // console.log(this.args.article.id);
    return this.args.article;
  }

  get shortText() {
    return (this.articleText = this.args.article.text.substring(0, 50));
  }
}
