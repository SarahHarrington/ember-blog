import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default class TextEditorComponent extends Component {
  @tracked editor;
  @tracked textBody = "";

  @action
  loadEditor() {
    ClassicEditor.create(document.querySelector("#editor-container"))
      .then((newEditor) => {
        this.editor = newEditor;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  @action
  updatedBody() {
    this.textBody = this.editor.getData();
    console.log(this.textBody);
    this.args.bodyUpdated(this.textBody);
  }
}
