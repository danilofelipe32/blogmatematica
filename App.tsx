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
