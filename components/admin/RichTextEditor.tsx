"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useRef, useState } from "react";

/** One toolbar button. */
function TB({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className="min-w-[34px] h-[34px] px-2 rounded-[8px] text-[13px] font-semibold border transition-colors disabled:opacity-40"
      style={{
        borderColor: "var(--border)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--text)",
      }}
    >
      {children}
    </button>
  );
}

function Toolbar({
  editor,
  onImage,
  uploading,
}: {
  editor: Editor;
  onImage: () => void;
  uploading: boolean;
}) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (leave empty to remove):", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap gap-[6px] p-2 border-b border-border bg-bg sticky top-0 z-[2]">
      <TB title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
        <strong>B</strong>
      </TB>
      <TB title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
        <em>I</em>
      </TB>
      <TB title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>
        <s>S</s>
      </TB>
      <span className="w-px bg-border mx-1" />
      <TB title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
        H2
      </TB>
      <TB title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
        H3
      </TB>
      <span className="w-px bg-border mx-1" />
      <TB title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
        •
      </TB>
      <TB title="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
        1.
      </TB>
      <TB title="Quote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
        ❝
      </TB>
      <TB title="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")}>
        {"</>"}
      </TB>
      <span className="w-px bg-border mx-1" />
      <TB title="Add / edit link" onClick={setLink} active={editor.isActive("link")}>
        🔗
      </TB>
      <TB title="Insert image" onClick={onImage} disabled={uploading}>
        {uploading ? "…" : "🖼"}
      </TB>
      <span className="w-px bg-border mx-1" />
      <TB title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        ↶
      </TB>
      <TB title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        ↷
      </TB>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  onError,
}: {
  value: string;
  onChange: (html: string) => void;
  onError?: (msg: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    immediatelyRender: false, // avoid SSR hydration mismatch in Next.js
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
      Image.configure({ HTMLAttributes: { class: "rounded-[10px] border border-border" } }),
      Placeholder.configure({ placeholder: "Write your post…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[320px] px-4 py-4 outline-none text-text text-[15px] leading-[1.7]",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const pickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.url) editor.chain().focus().setImage({ src: d.url, alt: file.name }).run();
      else onError?.(d.error || "Image upload failed.");
    } catch {
      onError?.("Image upload failed — check your connection.");
    } finally {
      setUploading(false);
    }
  };

  if (!editor) {
    return (
      <div className="rounded-[10px] border border-border bg-bg min-h-[380px] flex items-center justify-center text-text-2 text-[13px]">
        Loading editor…
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-border bg-bg overflow-hidden">
      <Toolbar editor={editor} onImage={() => fileRef.current?.click()} uploading={uploading} />
      <input
        ref={fileRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={pickImage}
      />
      <EditorContent editor={editor} />
    </div>
  );
}
