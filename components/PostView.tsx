import React, { useEffect, useRef } from 'react';
import { Post } from '../types';

interface PostViewProps {
    post: Post;
    onBack: () => void;
}

// Extend the Window interface to include renderMathInElement
declare global {
    interface Window {
        renderMathInElement?: (element: HTMLElement, options?: any) => void;
        katex?: any;
    }
}


const PostView: React.FC<PostViewProps> = ({ post, onBack }) => {
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (contentRef.current && window.renderMathInElement && window.katex) {
            window.renderMathInElement(contentRef.current, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        }
    }, [post]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/600x400/0284c7/FFFFFF?text=Math';
    };

    return (
        <div>
            <button onClick={onBack} className="mb-8 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Voltar
            </button>
            <article ref={contentRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-64 sm:h-80 overflow-hidden">
                    <img src={post.image} onError={handleImageError} alt={`Imagem para ${post.title}`} className="w-full h-full object-cover"/>
                </div>
                <div className="p-6 sm:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{post.title}</h1>
                    <p className="text-md text-gray-500 mt-2 mb-6">Por {post.author} em {post.date}</p>
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </div>
            </article>
        </div>
    );
};

export default PostView;