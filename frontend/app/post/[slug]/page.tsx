import { Card } from "@/components/ui/card";
import { fetchAPI } from "@/lib/api";
import { notFound } from "next/navigation";

interface Post {
    id: number;
    title: string;
    slug: string;
    content: string;
    coverImage: { data: { attributes: { url: string } } } | null;
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
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="overflow-hidden">
          {post.coverImage?.data && (
            <img
              src={post.coverImage.data.attributes.url}
              alt={post.title}
              className="w-full h-72 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500 mt-2">
              By {post.author?.name || "Unknown"} |{" "}
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <div className="mt-4 space-y-4">
              <div
                className="prose max-w-full"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.categories?.map((cat) => (
                <span
                  key={cat.id}
                  className="text-xs bg-gray-200 px-2 py-1 rounded"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  }
  