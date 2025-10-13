
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Post } from '../types';
import { CATEGORIES } from '../constants';

interface AddEditPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (post: Omit<Post, 'id' | 'content'> & { id?: number; content?: string }) => void;
    postToEdit: Post | null;
}

const AddEditPostModal: React.FC<AddEditPostModalProps> = ({ isOpen, onClose, onSave, postToEdit }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        date: '',
        image: '',
        excerpt: '',
        category: CATEGORIES[1] || 'Álgebra',
    });

    useEffect(() => {
        if (isOpen && postToEdit) {
            setFormData({
                title: postToEdit.title,
                author: postToEdit.author,
                date: postToEdit.date,
                image: postToEdit.image,
                excerpt: postToEdit.excerpt,
                category: postToEdit.category,
            });
        } else if (isOpen) {
            setFormData({
                title: '', author: '', date: '', image: '', excerpt: '', category: CATEGORIES[1] || 'Álgebra',
            });
        }
    }, [isOpen, postToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: postToEdit?.id });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-md mx-auto overflow-y-auto max-h-[90vh]">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {postToEdit ? 'Editar Publicação' : 'Adicionar Nova Publicação'}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="postImage" className="block text-sm font-medium text-gray-700 mb-1">Link da Imagem</label>
                        <input type="url" id="postImage" name="image" value={formData.image} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="https://exemplo.com/imagem.jpg" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input type="text" id="postTitle" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postAuthor" className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                        <input type="text" id="postAuthor" name="author" value={formData.author} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Nome do Autor" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postDescription" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                        <textarea id="postDescription" name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postDate" className="block text-sm font-medium text-gray-700 mb-1">Data da Publicação</label>
                        <input type="text" id="postDate" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: 7 de Outubro, 2025" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="postCategory" className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                        <select id="postCategory" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            {CATEGORIES.filter(c => c !== 'Todos').map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            {postToEdit ? 'Salvar Alterações' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddEditPostModal;
