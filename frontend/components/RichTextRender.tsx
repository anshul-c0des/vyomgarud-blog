'use client'; 
import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Link from 'next/link';

interface RichTextRendererProps {
  content: BlocksContent;
}

const customRendererBlocks: any = {
    // --- Headings ---
    heading: ({ children, level }: { children: React.ReactNode, level: 1 | 2 | 3 | 4 | 5 | 6 }) => {
        switch (level) {
            case 2:
                return <h2 className="text-3xl font-extrabold mt-10 mb-4 text-brand-orange dark:text-orange-400">{children}</h2>;
            case 3:
                return <h3 className="text-2xl font-bold mt-8 mb-3 text-brand-orange/90 dark:text-orange-300">{children}</h3>;
            case 4:
                return <h4 className="text-xl font-semibold mt-6 mb-2 text-neutral-black dark:text-neutral-white">{children}</h4>;
            default:
                return <h1 className={`text-xl font-bold mt-4 mb-2 text-neutral-black dark:text-neutral-white`}>{children}</h1>;
        }
    },
    
    // --- Paragraphs ---
    paragraph: ({ children }: { children: React.ReactNode }) => (
        <p className="text-lg text-neutral-gray-800 dark:text-neutral-gray-200 leading-relaxed mb-6">
            {children}
        </p>
    ),

    // --- Links ---
    link: ({ children, url }: { children: React.ReactNode, url: string }) => (
        <Link 
            href={url}
            target='_blank'
            className="text-brand-orange font-medium hover:text-brand-orange-dark underline underline-offset-4 transition-colors"
        >
            {children}
        </Link>
    ),

    // --- Lists ---
    list: ({ children, format }: { children: React.ReactNode, format: 'unordered' | 'ordered' }) => (
        <ul className={`list-outside ml-6 ${format === 'ordered' ? 'list-decimal' : 'list-disc'} space-y-2 text-lg text-neutral-gray-700 dark:text-neutral-gray-300 my-4`}>
            {children}
        </ul>
    ),

    // --- Blockquotes ---
    quote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-brand-orange pl-6 py-2 italic text-neutral-gray-600 dark:text-neutral-gray-400 my-8 bg-orange-50/50 dark:bg-neutral-gray-800/50 rounded-r-lg">
            {children}
        </blockquote>
    ),

    // --- Code Blocks ---
    code: ({ children }: { children: React.ReactNode }) => (
        <pre className="bg-neutral-gray-900/90 p-4 rounded-lg overflow-x-auto text-sm text-neutral-gray-100 my-6 shadow-xl">
            <code>{children}</code>
        </pre>
    ),
};


export default function RichTextRenderer({ content }: RichTextRendererProps) {
  return (
    <div className="prose dark:prose-invert prose-lg max-w-none">
      <BlocksRenderer
        content={content}
        blocks={customRendererBlocks} 
      />
    </div>
  );
}