import React, { useState, useMemo, useCallback } from 'react';
import { Post, Job } from './types';
import { INITIAL_POSTS, INITIAL_JOBS, CATEGORIES, POSTS_PER_PAGE } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import JobsList from './components/JobsList';
import PostView from './components/PostView';
import Pagination from './components/Pagination';
import FloatingActionButtons from './components/FloatingActionButtons';
import PasswordModal from './components/PasswordModal';
import AddEditPostModal from './components/AddEditPostModal';
import AddEditJobModal from './components/AddEditJobModal';
import AdminModal from './components/AdminModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

const App: React.FC = () => {
    const [posts, setPosts] = useLocalStorage<Post[]>('mathBlogPosts', INITIAL_POSTS);
    const [jobs, setJobs] = useLocalStorage<Job[]>('mathBlogJobs', INITIAL_JOBS);
    const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentJobPage, setCurrentJobPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [activeTab, setActiveTab] = useState<'posts' | 'jobs'>('posts');


    // Modal States
    const [passwordModalAction, setPasswordModalAction] = useState<'add_post' | 'admin' | 'add_job' | 'edit_job' | null>(null);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);
    const [isAddEditJobModalOpen, setIsAddEditJobModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState<Job | null>(null);


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
    
    const paginatedJobs = useMemo(() => {
        const startIndex = (currentJobPage - 1) * POSTS_PER_PAGE;
        return jobs.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [jobs, currentJobPage]);

    const totalJobPages = Math.ceil(jobs.length / POSTS_PER_PAGE);

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
    
    const handleJobPageChange = (page: number) => {
        if (page < 1 || page > totalJobPages) return;
        setCurrentJobPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSelectPost = (id: number) => {
        setSelectedPostId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBackToList = () => {
        setSelectedPostId(null);
    };
    
    const requestPassword = (action: 'add_post' | 'admin' | 'add_job' | 'edit_job') => {
        setPasswordModalAction(action);
    };

    const handlePasswordSuccess = () => {
        const action = passwordModalAction;
        setPasswordModalAction(null);
        if (action === 'add_post') {
            setPostToEdit(null);
            setIsAddEditModalOpen(true);
        } else if (action === 'admin') {
            setIsAdminModalOpen(true);
        } else if (action === 'add_job') {
            setJobToEdit(null);
            setIsAddEditJobModalOpen(true);
        } else if (action === 'edit_job') {
            setIsAddEditJobModalOpen(true);
        }
    };
    
    const handleSavePost = (postData: Omit<Post, 'id' | 'content'> & { id?: number; content?: string }) => {
        if (postData.id) {
            setPosts(posts.map(p => p.id === postData.id ? { ...p, ...postData } : p));
        } else {
            const newPost: Post = {
                id: Date.now(),
                content: '<p>Este é um novo post. O conteúdo completo pode ser adicionado aqui usando HTML.</p>',
                ...postData,
            };
            setPosts([newPost, ...posts]);
        }
        setIsAddEditModalOpen(false);
        setPostToEdit(null);
    };

    const handleEditPostRequest = (post: Post) => {
        setPostToEdit(post);
        setIsAddEditModalOpen(true);
    };

    const handleDeleteRequest = (id: number) => {
        setPostToDeleteId(id);
        setIsDeleteConfirmModalOpen(true);
        setIsAdminModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        if (postToDeleteId) {
            setPosts(posts.filter(p => p.id !== postToDeleteId));
        }
        setIsDeleteConfirmModalOpen(false);
        setPostToDeleteId(null);
        setIsAdminModalOpen(true);
    };
    
    const handleSaveJob = (jobData: Omit<Job, 'id'> & { id?: number }) => {
        if (jobData.id) {
            setJobs(jobs.map(j => j.id === jobData.id ? { ...j, ...jobData } : j));
        } else {
            const newJob: Job = {
                id: Date.now(),
                ...jobData,
            };
            setJobs([newJob, ...jobs]);
        }
        setIsAddEditJobModalOpen(false);
        setJobToEdit(null);
    };
    
    const handleEditJobRequest = (job: Job) => {
        setJobToEdit(job);
        requestPassword('edit_job');
    };

    const selectedPost = useMemo(() => posts.find(p => p.id === selectedPostId), [posts, selectedPostId]);
    
    const handleAddClick = () => {
        if (activeTab === 'posts') {
            requestPassword('add_post');
        } else {
            requestPassword('add_job');
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
                {selectedPost ? (
                    <PostView post={selectedPost} onBack={handleBackToList} />
                ) : (
                    <>
                        <div className="mb-8">
                            <div className="flex justify-center border-b border-gray-200">
                                <button onClick={() => setActiveTab('posts')} className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === 'posts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                    Publicações
                                </button>
                                <button onClick={() => setActiveTab('jobs')} className={`px-4 py-2 text-lg font-medium transition-colors ${activeTab === 'jobs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                    Trabalhos
                                </button>
                            </div>
                        </div>

                        {activeTab === 'posts' && (
                             <div>
                                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                                    <input
                                        type="text"
                                        placeholder="Pesquisar publicações..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <div className="relative w-full sm:w-auto">
                                        <button onClick={() => setIsFilterVisible(!isFilterVisible)} className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-between">
                                            <span>{activeCategory}</span>
                                            <svg className={`w-5 h-5 ml-2 transition-transform ${isFilterVisible ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </button>
                                        {isFilterVisible && (
                                            <div className="absolute z-10 top-full left-0 mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                                                {CATEGORIES.map(category => (
                                                    <a href="#" key={category} onClick={(e) => { e.preventDefault(); handleCategoryChange(category); setIsFilterVisible(false); }} className={`block px-4 py-2 text-sm ${activeCategory === category ? 'font-bold text-blue-600' : 'text-gray-700'} hover:bg-gray-100`}>{category}</a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                             </div>
                        )}
                        
                        {activeTab === 'jobs' && (
                            <div>
                                <JobsList jobs={paginatedJobs} onEdit={handleEditJobRequest} />
                                <div className="mt-12">
                                    <Pagination currentPage={currentJobPage} totalPages={totalJobPages} onPageChange={handleJobPageChange} />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
            
            <FloatingActionButtons 
                onAdminClick={() => requestPassword('admin')}
                onAddClick={handleAddClick}
                showAdmin={activeTab === 'posts'}
            />

            <PasswordModal
                isOpen={!!passwordModalAction}
                onClose={() => setPasswordModalAction(null)}
                onSuccess={handlePasswordSuccess}
            />
            
            <AddEditPostModal
                isOpen={isAddEditModalOpen}
                onClose={() => { setIsAddEditModalOpen(false); setPostToEdit(null); }}
                onSave={handleSavePost}
                postToEdit={postToEdit}
            />

            <AddEditJobModal
                isOpen={isAddEditJobModalOpen}
                onClose={() => { setIsAddEditJobModalOpen(false); setJobToEdit(null); }}
                onSave={handleSaveJob}
                jobToEdit={jobToEdit}
            />

            <AdminModal
                isOpen={isAdminModalOpen}
                onClose={() => setIsAdminModalOpen(false)}
                posts={posts}
                onEdit={(post) => {
                    setIsAdminModalOpen(false);
                    handleEditPostRequest(post);
                }}
                onDelete={handleDeleteRequest}
            />
            
            <DeleteConfirmModal 
                isOpen={isDeleteConfirmModalOpen}
                onClose={() => { setIsDeleteConfirmModalOpen(false); setIsAdminModalOpen(true); }}
                onConfirm={handleDeleteConfirm}
            />

        </div>
    );
};

export default App;
