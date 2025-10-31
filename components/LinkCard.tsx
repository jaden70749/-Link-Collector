
import React from 'react';
import type { Link } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';

interface LinkCardProps {
  link: Link;
  onDelete: (id: string) => void;
  onEdit: (link: Link) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete, onEdit }) => {
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;
    } catch (error) {
      return `https://picsum.photos/64`; // Fallback image
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex items-start">
          <img
            src={getFaviconUrl(link.url)}
            alt="favicon"
            className="w-10 h-10 rounded-md mr-4 mt-1 bg-gray-700 object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/64`;
            }}
          />
          <div className="flex-1">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <h3 className="text-lg font-semibold text-text group-hover:text-primary transition-colors truncate">
                {link.title}
              </h3>
              <p className="text-sm text-text-secondary group-hover:text-blue-400 transition-colors mt-1 break-all">
                {link.url}
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="p-3 bg-gray-800/50 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(link)}
          className="p-2 text-text-secondary hover:text-white hover:bg-gray-600 rounded-full transition-colors"
          aria-label="Edit link"
        >
          <EditIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => onDelete(link.id)}
          className="p-2 text-text-secondary hover:text-red-400 hover:bg-red-900/50 rounded-full transition-colors"
          aria-label="Delete link"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default LinkCard;
