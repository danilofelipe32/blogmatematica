import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import { ADMIN_PASSWORD } from '../constants';

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setError(false);
            setPassword('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            onSuccess();
        } else {
            setError(true);
            setPassword('');
            inputRef.current?.focus();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-sm mx-auto">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Acesso Restrito</h3>
                <p className="text-gray-600 mb-4">Por favor, insira a senha para continuar.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                        <input
                            ref={inputRef}
                            type="password"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">Senha incorreta. Tente novamente.</p>}
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Entrar</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default PasswordModal;