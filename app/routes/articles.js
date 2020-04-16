import Route from "@ember/routing/route";

export default class ArticlesRoute extends Route {
  async model() {
    let response = await fetch("http://localhost:3000/api/articles");
    let parsed = await response.json();
    return parsed;
  }
}
