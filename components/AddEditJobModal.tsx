import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Job } from '../types';

interface AddEditJobModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (job: Omit<Job, 'id'> & { id?: number }) => void;
    jobToEdit: Job | null;
    onDelete: (id: number) => void;
}

const AddEditJobModal: React.FC<AddEditJobModalProps> = ({ isOpen, onClose, onSave, jobToEdit, onDelete }) => {
    const initialFormState = {
        title: '',
        problem: '',
        date: '',
        image1: '',
        image2: '',
        image3: '',
        solutionDescription: '',
        solutionType: '',
        tools: '',
        link: '',
        components: '',
    };
    
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (isOpen && jobToEdit) {
            setFormData({
                title: jobToEdit.title,
                problem: jobToEdit.problem,
                date: jobToEdit.date,
                image1: jobToEdit.image1,
                image2: jobToEdit.image2,
                image3: jobToEdit.image3,
                solutionDescription: jobToEdit.solutionDescription,
                solutionType: jobToEdit.solutionType,
                tools: jobToEdit.tools,
                link: jobToEdit.link || '',
                components: jobToEdit.components || '',
            });
        } else if (isOpen) {
            setFormData(initialFormState);
        }
    }, [isOpen, jobToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: jobToEdit?.id });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-lg mx-auto overflow-y-auto max-h-[90vh]">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {jobToEdit ? 'Editar Trabalho' : 'Adicionar Novo Trabalho'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">Título do Trabalho</label>
                        <input type="text" id="jobTitle" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="jobProblem" className="block text-sm font-medium text-gray-700 mb-1">Problema a ser Solucionado</label>
                        <textarea id="jobProblem" name="problem" value={formData.problem} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="jobSolutionDescription" className="block text-sm font-medium text-gray-700 mb-1">Descrição da Solução</label>
                        <textarea id="jobSolutionDescription" name="solutionDescription" value={formData.solutionDescription} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label htmlFor="jobSolutionType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Solução</label>
                           <input type="text" id="jobSolutionType" name="solutionType" value={formData.solutionType} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="jobTools" className="block text-sm font-medium text-gray-700 mb-1">Ferramentas Utilizadas</label>
                            <input type="text" id="jobTools" name="tools" value={formData.tools} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="jobComponents" className="block text-sm font-medium text-gray-700 mb-1">Componentes (nomes separados por vírgula)</label>
                        <input type="text" id="jobComponents" name="components" value={formData.components} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: João, Maria, José" />
                    </div>
                    <div>
                        <label htmlFor="jobImage1" className="block text-sm font-medium text-gray-700 mb-1">Link da Imagem 1</label>
                        <input type="url" id="jobImage1" name="image1" value={formData.image1} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="https://imgur.com/..." required />
                    </div>
                     <div>
                        <label htmlFor="jobImage2" className="block text-sm font-medium text-gray-700 mb-1">Link da Imagem 2</label>
                        <input type="url" id="jobImage2" name="image2" value={formData.image2} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="https://imgur.com/..." />
                    </div>
                     <div>
                        <label htmlFor="jobImage3" className="block text-sm font-medium text-gray-700 mb-1">Link da Imagem 3</label>
                        <input type="url" id="jobImage3" name="image3" value={formData.image3} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="https://imgur.com/..." />
                    </div>
                     <div>
                        <label htmlFor="jobLink" className="block text-sm font-medium text-gray-700 mb-1">Link da Aplicação</label>
                        <input type="url" id="jobLink" name="link" value={formData.link} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="https://exemplo.com/projeto" />
                    </div>
                    <div>
                        <label htmlFor="jobDate" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                        <input type="text" id="jobDate" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ex: 15 de Outubro, 2025" required />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <div>
                            {jobToEdit && (
                                <button
                                    type="button"
                                    onClick={() => onDelete(jobToEdit.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Excluir Trabalho
                                </button>
                            )}
                        </div>
                        <div className="flex space-x-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                {jobToEdit ? 'Salvar Alterações' : 'Salvar Trabalho'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddEditJobModal;