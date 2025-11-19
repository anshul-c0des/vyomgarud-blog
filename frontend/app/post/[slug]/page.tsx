import { fetchAPI } from "@/lib/api";
import { notFound } from "next/navigation";
import { Calendar, User, Tag } from "lucide-react";
import RichTextRenderer from "@/components/RichTextRender";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: any;
  coverImage?: {
    formats: { thumbnail: { url: string; width: number; height: number } };
  } | null;
  publishedAt: string;
  author: { id: number; name: string } | null;
  categories: { id: number; name: string }[] | null;
}

interface Props {
  params: { slug: string };
}

export default async function PostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) return notFound();

  const res = await fetchAPI(`posts?filters[slug][$eq]=${slug}&populate=*`);
  const post: Post | undefined = res.data?.[0];

  if (!post) return notFound();

  return (
    <div className="min-h-screen pt-12 pb-24 bg-neutral-white dark:bg-neutral-black transition-colors duration-500">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-neutral-black dark:text-neutral-white">
            {post.title}
          </h1>

          <div className="flex justify-center items-center gap-6 mt-4 text-neutral-gray-600 dark:text-neutral-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-brand-orange" />
              <p>
                By{" "}
                <span className="font-semibold text-neutral-black dark:text-neutral-white">
                  {post.author?.name || "Unknown"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-orange" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </div>
          </div>
        </header>

        {post.coverImage && (
          <div className="mb-10 lg:mb-12 shadow-md rounded-xl overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.coverImage?.formats?.thumbnail?.url}`}
              alt={post.title}
              className="w-full h-[400px] object-cover transition-transform duration-500 ease-in-out hover:scale-[1.02]"
            />
          </div>
        )}

        <section className="py-8">
          <RichTextRenderer content={post.content} />
        </section>

        <footer className="mt-16 pt-8 border-t border-neutral-gray-200 dark:border-neutral-gray-700">
          <div className="flex items-center flex-wrap gap-4">
            <Tag className="w-5 h-5 text-brand-orange dark:text-orange-400" />
            <span className="font-semibold text-neutral-black dark:text-neutral-white text-md">
              Tags:
            </span>

            <div className="flex flex-wrap gap-3">
              {post.categories?.map((cat) => (
                <span
                  key={cat.id}
                  className="text-sm bg-orange-100 dark:bg-orange-900/50 text-brand-orange dark:text-orange-300 px-3 py-1.5 rounded-full font-medium transition-colors duration-300 hover:bg-brand-orange hover:text-white cursor-default"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </footer>
      </article>
      
      <div className="text-center mt-16">
        <a
          href="/"
          className="inline-flex items-center text-md font-semibold text-brand-orange dark:text-orange-400 hover:text-orange-600 transition-colors"
        >
          &larr; Back to Home
        </a>
      </div>
    </div>
  );
}
