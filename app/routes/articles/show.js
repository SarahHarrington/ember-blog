import Route from "@ember/routing/route";

export default class ArticlesShowRoute extends Route {
  async model(params) {
    // console.log("the show route", params);

    const articleId = params.article_id;

    const response = await fetch(
      `http://localhost:3000/api/articles/${articleId}/`
    );
    const parsed = await response.json();
    // console.log(parsed);
    return parsed;
  }

  // @action deleteArticle() {
  //   console.log("the delete button was clicked");
  // }
  // }
}
