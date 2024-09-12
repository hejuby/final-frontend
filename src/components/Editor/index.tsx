"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Paragraph,
  Undo,
  Underline,
  Strikethrough,
  FontFamily,
  FontSize,
  FontColor,
  Alignment,
  Image,
  ImageUpload,
  ImageResize,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "./index.scss";

interface EditorProps {
  initialData?: string;
  placeholder?: string;
  setContent: (content: string) => void;
}

const Editor = ({ initialData, placeholder, setContent }: EditorProps) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: {
          items: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "|",
            "fontfamily",
            "fontsize",
            "fontcolor",
            "|",
            "alignment",
            "|",
            "uploadImage",
          ],
        },
        plugins: [
          Essentials,
          Paragraph,
          Undo,
          Bold,
          Italic,
          Underline,
          Strikethrough,
          FontFamily,
          FontSize,
          FontColor,
          Alignment,
          Image,
          ImageUpload,
          ImageResize,
        ],
        initialData,
        placeholder,
      }}
      onChange={(event, editor) => {
        setContent(editor.getData());
      }}
    />
  );
};

export default Editor;
