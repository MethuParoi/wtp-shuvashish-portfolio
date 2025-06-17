'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
      <div className="text-gray-500">Loading editor...</div>
    </div>
  )
});

export default function RichTextEditor({ value, onChange, placeholder = "Start writing your blog..." }) {
  const editor = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder,
    height: 400,
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
    },
    removeButtons: ['source', 'fullsize', 'about'],
    showCharsCounter: true,
    showWordsCounter: true,
    toolbarAdaptive: false,
    buttons: [
      'bold', 'italic', 'underline', '|',
      'ul', 'ol', '|',
      'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'link', 'table', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat'
    ]
  }), [placeholder]);

  if (!isClient) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="jodit-editor-wrapper">
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={onChange}
      />
    </div>
  );
}
