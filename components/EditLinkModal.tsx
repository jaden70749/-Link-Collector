
import React, { useState, useEffect } from 'react';
import type { Link } from '../types';
import { CloseIcon } from './icons/CloseIcon';

interface EditLinkModalProps {
  link: Link;
  onUpdateLink: (link: Link) => void;
  onClose: () => void;
}

const EditLinkModal: React.FC<EditLinkModalProps> = ({ link, onUpdateLink, onClose }) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(link.title);
    setUrl(link.url);
  }, [link]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (!url.trim() || !title.trim()) {
      setError('URL과 제목을 모두 입력해주세요.');
      return;
    }
    try {
      new URL(url);
    } catch (_) {
      setError('유효한 URL을 입력해주세요.');
      return;
    }
    setError('');
    onUpdateLink({ ...link, title, url });
  };
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-lg shadow-xl w-full max-w-md border border-gray-700 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">링크 수정</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-600 transition-colors">
            <CloseIcon className="h-6 w-6 text-text-secondary" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-medium text-text-secondary mb-1">제목</label>
            <input
              id="edit-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 text-text rounded-md shadow-sm focus:ring-primary focus:border-primary px-3 py-2 transition"
            />
          </div>
          <div>
            <label htmlFor="edit-url" className="block text-sm font-medium text-text-secondary mb-1">URL</label>
            <input
              id="edit-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 text-text rounded-md shadow-sm focus:ring-primary focus:border-primary px-3 py-2 transition"
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-text-secondary hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 focus:ring-offset-background transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditLinkModal;
