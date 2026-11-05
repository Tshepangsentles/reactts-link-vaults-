import { Link } from '../types';
import { formatDate } from '../utils';
import Tag from './Tag';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
  onTagClick: (tag: string) => void;
}

export default function LinkCard({ link, onEdit, onDelete, onTagClick }: LinkCardProps) {
  return (
    <article className="link-card">
      <div className="link-card__header">
        <h3 className="link-card__title">
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            {link.title}
          </a>
        </h3>
        <div className="link-card__actions">
          <button
            className="icon-btn"
            onClick={() => onEdit(link)}
            aria-label={`Edit ${link.title}`}
            title="Edit"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            </svg>
          </button>
          <button
            className="icon-btn icon-btn--danger"
            onClick={() => onDelete(link)}
            aria-label={`Delete ${link.title}`}
            title="Delete"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            </svg>
          </button>
        </div>
      </div>

      <a className="link-card__url" href={link.url} target="_blank" rel="noopener noreferrer">
        {link.url}
      </a>

      {link.description && <p className="link-card__desc">{link.description}</p>}

      {link.tags.length > 0 && (
        <div className="link-card__tags">
          {link.tags.map((tag) => (
            <Tag key={tag} label={tag} onClick={() => onTagClick(tag)} />
          ))}
        </div>
      )}

      <time className="link-card__date" dateTime={new Date(link.createdAt).toISOString()}>
        Added {formatDate(link.createdAt)}
      </time>
    </article>
  );
}
