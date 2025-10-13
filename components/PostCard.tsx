import React, { useRef, useEffect, useState } from 'react';
import { Post } from '../types';

interface PostCardProps {
    post: Post;
    onSelect: (id: number) => void;
    index: number;
}

const PostCard: React.FC<PostCardProps> = ({ post, onSelect, index }) => {
    const cardRef = useRef<HTMLElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const cardColors = ['from-cyan-400 to-blue-600', 'from-green-400 to-teal-600', 'from-purple-400 to-indigo-600', 'from-pink-400 to-rose-600', 'from-orange-400 to-red-600', 'from-sky-400 to-cyan-600'];
    const colorClass = cardColors[index % cardColors.length];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!imgRef.current) return;
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 10;
        imgRef.current.style.transform = `scale(1.2) translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
        if (imgRef.current) {
            imgRef.current.style.transform = 'scale(1.2)';
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://placehold.co/600x400/0284c7/FFFFFF?text=Math';
    };


    return (
        <article
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ '--card-index': index % 3 } as React.CSSProperties}
            className={`
                ${colorClass}
                bg-gradient-to-br text-white rounded-xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 transform hover:-translate-y-1 flex flex-col overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'}
                delay-[calc(var(--card-index)_*_150ms)]
            `}
        >
            <div className="w-full h-40 overflow-hidden">
                <img ref={imgRef} src={post.image} onError={handleImageError} alt={`Imagem para ${post.title}`} className="w-full h-full object-cover transition-transform duration-300 ease-out" style={{ transform: 'scale(1.2)' }}/>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white/80">por {post.author}</span>
                    <span className="bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelect(post.id); }} className="hover:text-white/90 transition-colors">{post.title}</a>
                </h3>
                <p className="text-white/90 text-sm mb-4 flex-grow">{post.excerpt}</p>
                <div className="mt-auto pt-2 flex justify-between items-center w-full">
                    <span className="text-xs text-white/80">{post.date}</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); onSelect(post.id); }} className="font-semibold text-white bg-violet-500 hover:bg-violet-600 rounded-full px-4 py-2 text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">Leia mais &rarr;</a>
                </div>
            </div>
        </article>
    );
};

export default PostCard;