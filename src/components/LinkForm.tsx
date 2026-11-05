import { useState, useEffect, useRef, FormEvent } from 'react';
import { LinkDraft } from '../types';
import { parseTags, normalizeUrl, isValidUrl } from '../utils';

interface LinkFormProps {
  initial?: LinkDraft | null;
  onSubmit: (data: LinkDraft) => void;
  onCancel: () => void;
}

export default function LinkForm({ initial, onSubmit, onCancel }: LinkFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [url, setUrl] = useState(initial?.url ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [tags, setTags] = useState(initial?.tags.join(', ') ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!title.trim()) next.title = 'Title is required';
    if (!url.trim()) next.url = 'URL is required';
    else if (!isValidUrl(url)) next.url = 'Please enter a valid URL';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: title.trim(),
      url: normalizeUrl(url),
      description: description.trim(),
      tags: parseTags(tags),
    });
  };

  return (
    <form className="link-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          ref={titleRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. React documentation"
          className={errors.title ? 'field__input field__input--error' : 'field__input'}
        />
        {errors.title && <span className="field__error">{errors.title}</span>}
      </div>

      <div className="field">
        <label htmlFor="url">Link (URL) *</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="e.g. react.dev"
          className={errors.url ? 'field__input field__input--error' : 'field__input'}
        />
        {errors.url && <span className="field__error">{errors.url}</span>}
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A short note about this link (optional)"
          rows={3}
          className="field__input"
        />
      </div>

      <div className="field">
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. react, docs, frontend"
          className="field__input"
        />
        <span className="field__hint">Separate tags with commas</span>
      </div>

      <div className="link-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {initial ? 'Save changes' : 'Save link'}
        </button>
      </div>
    </form>
  );
}
