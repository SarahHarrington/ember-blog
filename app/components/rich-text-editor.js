import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default class TextEditorComponent extends Component {
  @tracked editor;
  @tracked textBody = "";

  @action
  loadEditor() {
    ClassicEditor.create(document.querySelector("#editor-container"), {
      toolbar: ['heading', 'bold', 'italic'],
      
    })
      .then((newEditor) => {
        this.editor = newEditor;
        this.editor.model.document.on("change:data", () => {
          this.updatedBody();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updatedBody() {
    this.textBody = this.editor.getData();
    this.args.bodyUpdated(this.textBody);
  }
}
