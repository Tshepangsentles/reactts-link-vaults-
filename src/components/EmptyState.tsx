interface EmptyStateProps {
  hasSearch: boolean;
  onAdd: () => void;
}

export default function EmptyState({ hasSearch, onAdd }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">
        {hasSearch ? '🔍' : '🔗'}
      </div>
      <h3>{hasSearch ? 'No links match your search' : 'No links saved yet'}</h3>
      <p>
        {hasSearch
          ? 'Try a different search term or clear the search.'
          : 'Start building your collection by saving your first link.'}
      </p>
      {!hasSearch && (
        <button className="btn btn--primary" onClick={onAdd}>
          Add your first link
        </button>
      )}
    </div>
  );
}
