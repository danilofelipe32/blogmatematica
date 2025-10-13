
export interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
}

export interface Job {
  id: number;
  title: string;
  problem: string;
  date: string;
  image1: string;
  image2: string;
  image3: string;
  solutionDescription: string;
  solutionType: string;
  tools: string;
  link?: string;
  components?: string;
}