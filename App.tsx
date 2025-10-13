
import React, { useState, useMemo, useCallback } from 'react';
import { Post } from './types';
import { INITIAL_POSTS, CATEGORIES, POSTS_PER_PAGE } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import PostView from './components/PostView';
import Pagination from './components/Pagination';
import FloatingActionButtons from './components/FloatingActionButtons';
import PasswordModal from './components/PasswordModal';
import AddEditPostModal from './components/AddEditPostModal';
import AdminModal from './components/AdminModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const App: React.FC = () => {
    const [posts, setPosts] = useLocalStorage<Post[]>('mathBlogPosts', INITIAL_POSTS);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    // Modal States
    const [passwordModalAction, setPasswordModalAction] = useState<'add' | 'admin' | null>(null);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
            const matchesSearch = searchTerm === '' ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [posts, activeCategory, searchTerm]);

    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };
    
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectPost = (id: number) => {
        setSelectedPostId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToList = () => {
        setSelectedPostId(null);
    };
    
    const requestPassword = (action: 'add' | 'admin') => {
        setPasswordModalAction(action);
    };

    const handlePasswordSuccess = () => {
        const action = passwordModalAction;
        setPasswordModalAction(null);
        if (action === 'add') {
            setPostToEdit(null);
            setIsAddEditModalOpen(true);
        } else if (action === 'admin') {
            setIsAdminModalOpen(true);
        }
    };
    
    const handleSavePost = useCallback((postData: Omit<Post, 'id' | 'content'> & { id?: number; content?: string }) => {
        setPosts(prevPosts => {
            if (postData.id) { // Editing
                return prevPosts.map(p => p.id === postData.id ? { ...p, ...postData } : p);
            } else { // Adding
                const newPost: Post = {
                    ...postData,
                    id: Date.now(),
                    content: `<p>${postData.excerpt}</p>`,
                };
                return [newPost, ...prevPosts];
            }
        });
        setIsAddEditModalOpen(false);
    }, [setPosts]);

    const handleEditPost = (post: Post) => {
        setPostToEdit(post);
        setIsAdminModalOpen(false);
        setIsAddEditModalOpen(true);
    };

    const handleDeleteRequest = (id: number) => {
        setPostToDeleteId(id);
        setIsDeleteConfirmModalOpen(true);
    };

    const confirmDelete = () => {
        if (postToDeleteId !== null) {
            setPosts(posts.filter(p => p.id !== postToDeleteId));
        }
        setIsDeleteConfirmModalOpen(false);
        setPostToDeleteId(null);
    };


    const selectedPost = useMemo(() => posts.find(p => p.id === selectedPostId), [posts, selectedPostId]);

    return (
        <>
            <Header />

            <div className="container mx-auto max-w-5xl px-4 -mt-12 md:-mt-16 relative z-10">
                <div className="bg-slate-50/95 backdrop-blur-lg rounded-2xl mb-8 shadow-xl">
                    <div className="px-4 py-8 md:py-12 sm:px-8">
                        <main>
                            {selectedPost ? (
                                <PostView post={selectedPost} onBack={handleBackToList} />
                            ) : (
                                <>
                                    <div className="mb-8 max-w-lg mx-auto">
                                      <div className="relative">
                                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                              </svg>
                                          </div>
                                          <input type="text" value={searchTerm} onChange={handleSearchChange} className="block w-full pl-11 pr-12 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Pesquisar..."/>
                                          <button onClick={() => setIsFilterVisible(!isFilterVisible)} aria-label="Abrir filtros" className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-600">
                                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>
                                          </button>
                                      </div>
                                      {isFilterVisible && (
                                        <div className="mt-3 flex justify-center flex-wrap gap-2 px-4">
                                            {CATEGORIES.map(category => (
                                                <button key={category} onClick={() => handleCategoryChange(category)} className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                      )}
                                    </div>

                                    <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Publicações Recentes</h2>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                        {paginatedPosts.length > 0 ? (
                                            paginatedPosts.map((post, index) => (
                                                <PostCard key={post.id} post={post} onSelect={handleSelectPost} index={index} />
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500 md:col-span-2 lg:col-span-3">Nenhuma publicação encontrada.</p>
                                        )}
                                    </div>

                                    <div className="mt-12">
                                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                                    </div>
                                </>
                            )}
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
            
            <FloatingActionButtons onAdminClick={() => requestPassword('admin')} onAddClick={() => requestPassword('add')} />

            <PasswordModal 
                isOpen={!!passwordModalAction}
                onClose={() => setPasswordModalAction(null)}
                onSuccess={handlePasswordSuccess}
            />

            <AddEditPostModal
                isOpen={isAddEditModalOpen}
                onClose={() => setIsAddEditModalOpen(false)}
                onSave={handleSavePost}
                postToEdit={postToEdit}
            />

            <AdminModal
                isOpen={isAdminModalOpen}
                onClose={() => setIsAdminModalOpen(false)}
                posts={posts}
                onEdit={handleEditPost}
                onDelete={handleDeleteRequest}
            />
            
            <DeleteConfirmModal 
                isOpen={isDeleteConfirmModalOpen}
                onClose={() => setIsDeleteConfirmModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default App;
