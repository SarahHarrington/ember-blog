import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ArticleComponent extends Component {
  @tracked showMore = false;
  @tracked articleText;

  get article() {
    //! Look at Brian's notes for this!
    const theArticle = this.args.article;
    this.articleText = theArticle.text.substring(0, 100);
    // console.log(this.articleText);
    return theArticle;
  }

  @action async showArticle() {
    console.log("show the article was clicked");
    console.log(this.args.article.id);
    const articleId = this.args.article.id;
    const response = await fetch(
      `http://localhost:3000/api/articles/${articleId}/comments`
    );
    const parsed = await response.json();
    console.log(parsed);
    // return parsed;
  }

  @action deleteArticle() {
    console.log("the delete button was clicked");
  }
}
