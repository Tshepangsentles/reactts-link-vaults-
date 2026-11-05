import { useState, useMemo, useCallback } from 'react';
import { Link, ToastMessage, ToastType, LinkDraft } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils';
import LinkForm from './components/LinkForm';
import LinkCard from './components/LinkCard';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import Modal from './components/Modal';
import EmptyState from './components/EmptyState';

export default function App() {
  const [links, setLinks] = useLocalStorage<Link[]>('linkvault-links', []);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Link | null>(null);
  const [deleting, setDeleting] = useState<Link | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredLinks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return links;
    return links.filter(
      (link) =>
        link.title.toLowerCase().includes(q) ||
        link.url.toLowerCase().includes(q) ||
        link.description.toLowerCase().includes(q) ||
        link.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [links, search]);

  const handleCreate = (data: LinkDraft) => {
    const now = Date.now();
    const newLink: Link = { ...data, id: generateId(), createdAt: now, updatedAt: now };
    setLinks((prev) => [newLink, ...prev]);
    setIsFormOpen(false);
    addToast('success', 'Link saved successfully');
  };

  const handleUpdate = (data: LinkDraft) => {
    if (!editing) return;
    setLinks((prev) =>
      prev.map((l) => (l.id === editing.id ? { ...l, ...data, updatedAt: Date.now() } : l))
    );
    setEditing(null);
    addToast('success', 'Link updated successfully');
  };

  const handleDelete = () => {
    if (!deleting) return;
    setLinks((prev) => prev.filter((l) => l.id !== deleting.id));
    setDeleting(null);
    addToast('info', 'Link deleted');
  };

  const handleTagClick = (tag: string) => setSearch(tag);

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__brand">
            <span className="app-header__logo" aria-hidden="true">🔗</span>
            <div>
              <h1>LinkVault</h1>
              <p>Save, organise and find your links</p>
            </div>
          </div>
          <button className="btn btn--primary" onClick={() => setIsFormOpen(true)}>
            <span className="btn__plus" aria-hidden="true">+</span> Add Link
          </button>
        </div>
      </header>

      <main className="app-main">
        <SearchBar
          value={search}
          onChange={setSearch}
          resultCount={filteredLinks.length}
          totalCount={links.length}
        />

        {filteredLinks.length === 0 ? (
          <EmptyState hasSearch={!!search.trim()} onAdd={() => setIsFormOpen(true)} />
        ) : (
          <div className="link-grid">
            {filteredLinks.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={setEditing}
                onDelete={setDeleting}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Your links are stored locally in your browser.</p>
      </footer>

      {isFormOpen && (
        <Modal title="Add a new link" onClose={() => setIsFormOpen(false)}>
          <LinkForm onSubmit={handleCreate} onCancel={() => setIsFormOpen(false)} />
        </Modal>
      )}

      {editing && (
        <Modal title="Edit link" onClose={() => setEditing(null)}>
          <LinkForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {deleting && (
        <Modal title="Delete link" onClose={() => setDeleting(null)}>
          <div className="confirm-delete">
            <p>
              Are you sure you want to delete <strong>“{deleting.title}”</strong>? This action
              cannot be undone.
            </p>
            <div className="confirm-delete__actions">
              <button className="btn btn--ghost" onClick={() => setDeleting(null)}>
                Cancel
              </button>
              <button className="btn btn--danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
