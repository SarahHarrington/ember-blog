import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ArticleIndexComponent extends Component {
  @tracked sortBy = "DESC";

  get articles() {
    if (this.sortBy === "DESC") {
      return this.args.articles.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      });
    }
    if (this.sortBy === "TITLE") {
      return this.args.articles.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }

  @action sortOrderChanged(order) {
    console.log("the order", order.target.value);
    this.sortBy = order.target.value;
  }
}
