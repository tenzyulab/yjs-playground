import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { Editor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useRef, useState } from 'react'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

export const IndexPage = () => {
  const docRef = useRef<Y.Doc | null>(null)
  const wsProviderRef = useRef<WebsocketProvider | null>(null)
  const [editor, setEditor] = useState<Editor | null>(null)

  useEffect(() => {
    docRef.current = new Y.Doc()
    wsProviderRef.current = new WebsocketProvider(
      'ws://localhost:1234',
      'tiptap',
      docRef.current
    )

    setEditor(
      new Editor({
        autofocus: true,
        extensions: [
          StarterKit,
          Collaboration.configure({
            document: docRef.current,
          }),
          CollaborationCursor.configure({
            provider: wsProviderRef.current,
          }),
        ],
      })
    )

    return () => {
      docRef.current?.destroy()
      wsProviderRef.current?.destroy()
    }
  }, [])

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  )
}
