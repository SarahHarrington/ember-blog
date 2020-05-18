import Route from "@ember/routing/route";
import ENV from "ember-blog/config/environment";
import { inject as service } from "@ember/service";

export default class ArticlesShowRoute extends Route {
  @service currentUser;

  async model(params) {
    // console.log("the show route", params);

    const articleId = params.article_id;

    const response = await fetch(`${ENV.host}/articles/${articleId}/`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${this.currentUser.token}`,
      },
    });
    const parsed = await response.json();
    // console.log(parsed);
    return parsed;
  }

  // @action deleteArticle() {
  //   console.log("the delete button was clicked");
  // }
  // }
}
