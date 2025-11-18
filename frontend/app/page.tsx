"use client"; // Needed for client-side filtering

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "../lib/api";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: any;
  coverImage?: { data: { attributes: { url: string } } } | null;
  publishedAt: string;
  author?: { id: number; name: string } | null;
  categories?: { id: number; name: string }[] | null;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [selectedAuthor, setSelectedAuthor] = useState<number | "all">("all");

  useEffect(() => {
    async function loadData() {
      const postRes = await fetchAPI("posts?populate=*");
      const catRes = await fetchAPI("categories");
      const authRes = await fetchAPI("authors");

      setPosts(postRes.data);
      setFilteredPosts(postRes.data);

      setCategories(catRes.data.map((c: any) => ({ id: c.id, name: c.name })));
      setAuthors(authRes.data.map((a: any) => ({ id: a.id, name: a.name })));
    }

    loadData();
  }, []);

  // Filter posts when selection changes
  useEffect(() => {
    let filtered = [...posts];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) =>
        post.categories?.some((c) => c.id === selectedCategory)
      );
    }

    if (selectedAuthor !== "all") {
      filtered = filtered.filter((post) => post.author?.id === selectedAuthor);
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, selectedAuthor, posts]);

  // Function to flatten content
function getPostText(content: any[]) {
  return content
    .map((block) => 
      block.children?.map((child: any) => child.text).join("") || ""
    )
    .join("\n"); // Join paragraphs with a newline
}


  return (
    <div>
      {/* Filters */}
      <div className="flex flex:col gap-4 mb-6">
        <label htmlFor="category" className="text-sm font-medium mb-1">Filter by Category</label>
        <Select onValueChange={(val) => setSelectedCategory(val==="all" ? "all" : Number(val))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

          <label htmlFor="category" className="text-sm font-medium mb-1">Filter by Authors</label>
        <Select onValueChange={(val) => setSelectedAuthor(val==="all" ? "all" : Number(val))}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Authors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Authors</SelectItem>
            {authors.map((auth) => (
              <SelectItem key={auth.id} value={auth.id.toString()}>
                {auth.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`}>
            <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition">
              {post.coverImage?.data && (
                <img
                  src={post.coverImage.data.attributes.url}
                  alt={post.title ?? "No title"}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-lg font-bold">{post.title}</h2>
                <p className="text-sm text-gray-500">
                  By {post.author?.name || "Unknown"}
                </p>
                <p className="text-md font-semibold">{getPostText(post.content)}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {post.categories?.map((cat) => (
                    <span
                      key={cat.id}
                      className="text-xs bg-gray-200 px-2 py-1 rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
