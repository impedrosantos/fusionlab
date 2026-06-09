import { useEffect, useRef, type CSSProperties } from 'react'

// Lightweight rich text for post descriptions: allows line breaks and basic
// inline formatting (bold / italic). Editor stores HTML; both the editor and
// the public viewer run everything through a small allow-list sanitizer so
// nothing but the whitelisted tags ever reaches the DOM.

const ALLOWED_TAGS = new Set(['B', 'STRONG', 'I', 'EM', 'BR', 'DIV', 'P'])

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function serialize(node: Node): string {
  let out = ''
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      out += escapeHtml(child.textContent ?? '')
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement
      const tag = el.tagName
      if (tag === 'BR') {
        out += '<br>'
      } else if (ALLOWED_TAGS.has(tag)) {
        const name = tag.toLowerCase()
        out += `<${name}>${serialize(el)}</${name}>`
      } else {
        // strip the disallowed tag but keep its (cleaned) contents
        out += serialize(el)
      }
    }
  })
  return out
}

/** Sanitize arbitrary HTML down to the allow-listed formatting tags. */
export function sanitizeRichText(html: string): string {
  if (!html) return ''
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return serialize(doc.body)
}

/** True when the (sanitized) value has no visible text. */
export function isRichTextEmpty(html: string): boolean {
  const clean = sanitizeRichText(html)
  return clean.replace(/<br>/g, '').replace(/<[^>]+>/g, '').trim() === ''
}

export function RichTextView({
  html,
  className,
  style,
}: {
  html: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`rich-text${className ? ` ${className}` : ''}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: sanitizeRichText(html) }}
    />
  )
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  // Sync external value in (e.g. when editing an existing post) without
  // clobbering the caret while the user is actively typing.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (document.activeElement === el) return
    const clean = sanitizeRichText(value)
    if (el.innerHTML !== clean) el.innerHTML = clean
  }, [value])

  const emit = () => {
    if (ref.current) onChange(ref.current.innerHTML)
  }

  const exec = (command: string) => {
    document.execCommand(command, false)
    ref.current?.focus()
    emit()
  }

  return (
    <div className="rich-editor-wrap">
      <div className="rich-toolbar">
        <button type="button" title="Negrito" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('bold')}>
          <strong>B</strong>
        </button>
        <button type="button" title="Itálico" onMouseDown={(e) => e.preventDefault()} onClick={() => exec('italic')}>
          <em>I</em>
        </button>
      </div>
      <div
        ref={ref}
        className="rich-editor"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        onInput={emit}
      />
    </div>
  )
}
