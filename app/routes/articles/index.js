import Route from "@ember/routing/route";

export default class ArticlesIndexRoute extends Route {
  async model() {
    const response = await fetch("http://localhost:3000/api/articles");
    const parsed = await response.json();
    return parsed;
  }
}
