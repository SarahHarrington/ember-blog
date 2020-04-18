import Component from "@glimmer/component";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ArticleFormComponent extends Component {
  //set the form values here
  @tracked title;
  @tracked post;
  @tracked createdArticle = null;

  @action
  async savePost() {
    try {
      const saveArticle = await fetch("http://localhost:3000/api/articles", {
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
      const articleToDisplay = await saveArticle.json();
      this.createdArticle = articleToDisplay;
    } catch (e) {
      console.log("There was an error.");
    }
  }
}
