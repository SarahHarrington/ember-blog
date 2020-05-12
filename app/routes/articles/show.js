import Route from "@ember/routing/route";
import ENV from "ember-blog/config/environment";

export default class ArticlesShowRoute extends Route {
  async model(params) {
    // console.log("the show route", params);

    const articleId = params.article_id;

    const response = await fetch(`${ENV.host}/articles/${articleId}/`);
    const parsed = await response.json();
    // console.log(parsed);
    return parsed;
  }

  // @action deleteArticle() {
  //   console.log("the delete button was clicked");
  // }
  // }
}
