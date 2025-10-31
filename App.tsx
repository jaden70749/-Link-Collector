
import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Link } from './types';
import AddLinkForm from './components/AddLinkForm';
import LinkCard from './components/LinkCard';
import EditLinkModal from './components/EditLinkModal';
import { LinkIcon } from './components/icons/LinkIcon';

const App: React.FC = () => {
  const [links, setLinks] = useLocalStorage<Link[]>('links', []);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const addLink = (url: string, title: string) => {
    const newLink: Link = {
      id: crypto.randomUUID(),
      url,
      title,
    };
    setLinks([...links, newLink]);
  };

  const deleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (updatedLink: Link) => {
    setLinks(links.map(link => (link.id === updatedLink.id ? updatedLink : link)));
    setEditingLink(null);
  };

  const openEditModal = (link: Link) => {
    setEditingLink(link);
  };

  const closeEditModal = () => {
    setEditingLink(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-center sm:justify-start mb-8">
          <LinkIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold ml-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            링크 콜렉터
          </h1>
        </header>

        <main>
          <div className="mb-8 p-6 bg-surface rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">새 링크 추가하기</h2>
            <AddLinkForm onAddLink={addLink} />
          </div>

          <div>
            {links.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map(link => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onDelete={deleteLink}
                    onEdit={openEditModal}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-6 bg-surface rounded-xl border border-dashed border-gray-600">
                <h3 className="text-xl font-medium text-text">저장된 링크가 없습니다.</h3>
                <p className="text-text-secondary mt-2">위 양식을 사용하여 첫 번째 링크를 추가하세요!</p>
              </div>
            )}
          </div>
        </main>
      </div>
      {editingLink && (
        <EditLinkModal
          link={editingLink}
          onUpdateLink={updateLink}
          onClose={closeEditModal}
        />
      )}
    </div>
  );
};

export default App;
