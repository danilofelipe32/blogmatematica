
import React from 'react';
import Modal from './Modal';
import { Post } from '../types';

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    posts: Post[];
    onEdit: (post: Post) => void;
    onDelete: (id: number) => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, posts, onEdit, onDelete }) => {
    
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/600x400/0284c7/FFFFFF?text=Math';
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="max-w-2xl mx-auto flex flex-col max-h-[90vh]">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-gray-800">Painel de Administração</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto">
                    {posts.length === 0 ? (
                        <p className="text-center text-gray-500">Nenhuma publicação encontrada.</p>
                    ) : (
                        <div className="space-y-2">
                        {posts.map(post => (
                            <div key={post.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4 overflow-hidden mr-4">
                                    <img src={post.image} onError={handleImageError} alt="" className="w-12 h-12 object-cover rounded-md flex-shrink-0"/>
                                    <div className="truncate">
                                        <p className="font-semibold text-gray-800 truncate">{post.title}</p>
                                        <p className="text-sm text-gray-500">{post.author}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 flex-shrink-0">
                                    <button onClick={() => onEdit(post)} className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">Editar</button>
                                    <button onClick={() => onDelete(post.id)} className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200">Excluir</button>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default AdminModal;
