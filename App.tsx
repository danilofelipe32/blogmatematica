import React, { useState, useMemo, useCallback } from 'react';
import { Post, Job } from './types';
import { INITIAL_POSTS, INITIAL_JOBS, CATEGORIES, POSTS_PER_PAGE } from './constants';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import JobsList from './components/JobsList';
import PostView from './components/PostView';
import PythagorasInteractive from './components/PythagorasInteractive';
import EulerInteractive from './components/EulerInteractive';
import IntegralsInteractive from './components/IntegralsInteractive';
import FirstDegreeEquationInteractive from './components/FirstDegreeEquationInteractive';
import NotableProductsInteractive from './components/NotableProductsInteractive';
import LinearSystemInteractive from './components/LinearSystemInteractive';
import FactoringInteractive from './components/FactoringInteractive';
import Pagination from './components/Pagination';
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
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [activeTab, setActiveTab] = useState<'posts' | 'jobs'>('posts');

    // Job States
    const [currentJobPage, setCurrentJobPage] = useState(1);
    const [jobSearchTerm, setJobSearchTerm] = useState('');
    const [activeJobCategory, setActiveJobCategory] = useState('Todos');
    const [isJobFilterVisible, setIsJobFilterVisible] = useState(true);

    // Modal States
    const [passwordModalAction, setPasswordModalAction] = useState<'add_post' | 'admin' | 'add_job' | 'edit_job' | null>(null);
    const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<Post | null>(null);
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);
    const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);
    const [isAddEditJobModalOpen, setIsAddEditJobModalOpen] = useState(false);
    const [jobToEdit, setJobToEdit] = useState<Job | null>(null);
    const [isDeleteJobConfirmModalOpen, setIsDeleteJobConfirmModalOpen] = useState(false);
    const [jobToDeleteId, setJobToDeleteId] = useState<number | null>(null);

    const JOB_CATEGORIES = useMemo(() => ['Todos', ...Array.from(new Set(jobs.map(job => job.solutionType)))], [jobs]);

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
    
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesCategory = activeJobCategory === 'Todos' || job.solutionType === activeJobCategory;
            const matchesSearch = jobSearchTerm === '' ||
                job.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
                job.problem.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
                job.solutionDescription.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
                job.tools.toLowerCase().includes(jobSearchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [jobs, activeJobCategory, jobSearchTerm]);
    
    const paginatedJobs = useMemo(() => {
        const startIndex = (currentJobPage - 1) * POSTS_PER_PAGE;
        return filteredJobs.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredJobs, currentJobPage]);

    const totalJobPages = Math.ceil(filteredJobs.length / POSTS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    
    const handleJobSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobSearchTerm(e.target.value);
        setCurrentJobPage(1);
    };

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };
    
    const handleJobCategoryChange = (category: string) => {
        setActiveJobCategory(category);
        setCurrentJobPage(1);
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
        setPosts(currentPosts => {
            if (postData.id) {
                return currentPosts.map(p => p.id === postData.id ? { ...p, ...postData } : p);
            }
            const newPost: Post = {
                id: Date.now(),
                content: '<p>Este é um novo post. O conteúdo completo pode ser adicionado aqui usando HTML.</p>',
                ...postData,
            };
            return [newPost, ...currentPosts];
        });
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
            setPosts(currentPosts => currentPosts.filter(p => p.id !== postToDeleteId));
        }
        setIsDeleteConfirmModalOpen(false);
        setPostToDeleteId(null);
        setIsAdminModalOpen(true);
    };
    
    const handleSaveJob = (jobData: Omit<Job, 'id'> & { id?: number }) => {
        setJobs(currentJobs => {
            if (jobData.id) {
                return currentJobs.map(j => j.id === jobData.id ? { ...j, ...jobData } as Job : j);
            }
            const newJob: Job = {
                id: Date.now(),
                ...jobData,
            };
            return [newJob, ...currentJobs];
        });
        setIsAddEditJobModalOpen(false);
        setJobToEdit(null);
    };
    
    const handleEditJobRequest = (job: Job) => {
        setJobToEdit(job);
        requestPassword('edit_job');
    };
    
    const handleDeleteJobRequest = (id: number) => {
        setJobToDeleteId(id);
        setIsAddEditJobModalOpen(false);
        setIsDeleteJobConfirmModalOpen(true);
    };

    const handleDeleteJobConfirm = () => {
        if (jobToDeleteId) {
            setJobs(currentJobs => currentJobs.filter(j => j.id !== jobToDeleteId));
        }
        setIsDeleteJobConfirmModalOpen(false);
        setJobToDeleteId(null);
    };

    const selectedPost = useMemo(() => posts.find(p => p.id === selectedPostId), [posts, selectedPostId]);

    const renderSelectedPost = () => {
        if (!selectedPost) return null;

        switch (selectedPost.id) {
            case 1:
                return <EulerInteractive onBack={handleBackToList} />;
            case 2:
                return <PythagorasInteractive onBack={handleBackToList} />;
            case 3:
                return <IntegralsInteractive onBack={handleBackToList} />;
            case 4:
                return <FirstDegreeEquationInteractive onBack={handleBackToList} />;
            case 5:
                return <NotableProductsInteractive onBack={handleBackToList} />;
            case 6:
                return <LinearSystemInteractive onBack={handleBackToList} />;
            case 7:
                return <FactoringInteractive onBack={handleBackToList} />;
            default:
                return <PostView post={selectedPost} onBack={handleBackToList} />;
        }
    };
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow container mx-auto p-4 sm:p-6 md:p-8">
                {selectedPost ? (
                    renderSelectedPost()
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
                                <div className="mb-8 max-w-3xl mx-auto">
                                    {/* Search Bar */}
                                    <div className="relative w-full mb-4">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Pesquisar..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="w-full pl-12 pr-12 py-3 border border-gray-200 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                                            aria-label="Pesquisar publicações"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <button
                                                onClick={() => setIsFilterVisible(!isFilterVisible)}
                                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                aria-label="Mostrar/esconder filtros de categoria"
                                                aria-expanded={isFilterVisible}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10m-7 6h4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {/* Category Pills */}
                                    {isFilterVisible && (
                                        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                                            {CATEGORIES.map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => handleCategoryChange(category)}
                                                    className={`
                                                        px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                                                        ${activeCategory === category
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'}
                                                    `}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    )}
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
                                <div className="mb-8 max-w-3xl mx-auto">
                                    <div className="relative w-full mb-4">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Pesquisar por título, problema, ferramenta..."
                                            value={jobSearchTerm}
                                            onChange={handleJobSearchChange}
                                            className="w-full pl-12 pr-12 py-3 border border-gray-200 bg-white rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
                                            aria-label="Pesquisar trabalhos"
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                            <button
                                                onClick={() => setIsJobFilterVisible(!isJobFilterVisible)}
                                                className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                aria-label="Mostrar/esconder filtros de tipo de solução"
                                                aria-expanded={isJobFilterVisible}
                                            >
                                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10m-7 6h4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    {isJobFilterVisible && (
                                        <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                                            {JOB_CATEGORIES.map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => handleJobCategoryChange(category)}
                                                    className={`
                                                        px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out
                                                        ${activeJobCategory === category
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'}
                                                    `}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
                onDelete={handleDeleteJobRequest}
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
                itemName="esta publicação"
            />
            
            <DeleteConfirmModal 
                isOpen={isDeleteJobConfirmModalOpen}
                onClose={() => { setIsDeleteJobConfirmModalOpen(false); setJobToDeleteId(null); }}
                onConfirm={handleDeleteJobConfirm}
                itemName="este trabalho"
            />

        </div>
    );
};

export default App;