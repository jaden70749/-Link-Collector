
import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface AddLinkFormProps {
  onAddLink: (url: string, title: string) => void;
}

const AddLinkForm: React.FC<AddLinkFormProps> = ({ onAddLink }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !title.trim()) {
      setError('URL과 제목을 모두 입력해주세요.');
      return;
    }
    try {
      // Basic URL validation
      new URL(url);
    } catch (_) {
      setError('유효한 URL을 입력해주세요.');
      return;
    }
    setError('');
    onAddLink(url, title);
    setUrl('');
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: React 공식 문서"
            className="w-full bg-gray-800 border border-gray-600 text-text rounded-md shadow-sm focus:ring-primary focus:border-primary px-3 py-2 transition"
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-text-secondary mb-1">URL</label>
          <input
            id="url"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://react.dev"
            className="w-full bg-gray-800 border border-gray-600 text-text rounded-md shadow-sm focus:ring-primary focus:border-primary px-3 py-2 transition"
          />
        </div>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-colors"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        링크 추가
      </button>
    </form>
  );
};

export default AddLinkForm;
