
import React from 'react';
import Modal from './Modal';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-sm mx-auto">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Confirmar Exclusão</h3>
                <p className="text-gray-600 mb-6">Tem certeza de que deseja excluir esta publicação? Esta ação não pode ser desfeita.</p>
                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                    <button type="button" onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Excluir</button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteConfirmModal;
