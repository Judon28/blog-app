import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { quillModules, quillFormats } from "./quillConfig";

function Editor(props) {
  return (
    <ReactQuill
      value={props.value}
      onChange={props.onChange}
      theme="snow"
      modules={quillModules}
      formats={quillFormats}
      placeholder="Write your post..."
      required
    />
  );
}

export default Editor;
