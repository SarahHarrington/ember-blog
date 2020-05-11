import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";

export default class ArticleFormComponent extends Component {
  @service router;
  //set the form values here
  @tracked title;
  @tracked post;
  @tracked createdArticle = null;

  @action
  async savePost() {
    try {
      await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        body: JSON.stringify({
          article: {
            title: this.title,
            text: this.post,
          },
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      // const articleToDisplay = await saveArticle.json();
      // console.log("articleToDisplay"), articleToDisplay;
      // this.createdArticle = articleToDisplay;
      this.router.transitionTo("articles.index");
    } catch (e) {
      console.log("There was an error.", e);
    }
  }
}
