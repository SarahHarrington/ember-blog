import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class CurrentUserService extends Service {
  @tracked token = "";
}
