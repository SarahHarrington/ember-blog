import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import Quill from "quill";

export default class TextEditorComponent extends Component {
  @tracked quill;

  @action
  loadEditor(element) {
    console.log(element);
    this.quill = new Quill("#editor-container", {
      modules: {
        toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"]],
      },
      placeholder: "Compose an epic...",
      theme: "snow", // or 'bubble'
    });
  }
}
