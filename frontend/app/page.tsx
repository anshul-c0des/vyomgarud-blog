"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAPI } from "../lib/api";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRightIcon, Drone } from "lucide-react";

interface Post {
  id: number;
  title: string;
  slug: string;
  content: any;
  coverImage?: {
    formats: { thumbnail: { url: string; width: number; height: number } };
  } | null;
  publishedAt: string;
  author?: { id: number; name: string } | null;
  categories?: { id: number; name: string }[] | null;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]); // posts fetched from API
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]); // filtered posts
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  ); // category filter
  const [authors, setAuthors] = useState<{ id: number; name: string }[]>([]); // author filter
  const [selectedCategory, setSelectedCategory] = useState<number | "all">(
    "all"
  ); // currently selected category
  const [selectedAuthor, setSelectedAuthor] = useState<number | "all">("all"); // currently selected author

  useEffect(() => {
    async function loadData() {
      const postRes = await fetchAPI("posts?populate=*"); // fetch posts with populated relationships
      const catRes = await fetchAPI("categories");
      const authRes = await fetchAPI("authors");

      setPosts(postRes.data);
      setFilteredPosts(postRes.data);

      setCategories(catRes.data.map((c: any) => ({ id: c.id, name: c.name })));
      setAuthors(authRes.data.map((a: any) => ({ id: a.id, name: a.name })));
    }

    loadData();
  }, []);

  // Filter posts on selection change
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

  // Flatten post content
  function getPostText(content: any[]) {
    const text = content
      .map(
        (block) =>
          block.children?.map((child: any) => child.text).join("") || ""
      )
      .join("\n");
    return text.length > 150 ? text.substring(0, 150) + "..." : text;
  }

  return (
    <div className="px-4 md:px-8 py-8 min-h-screen dark:bg-black transition-colors duration-500">
      {/* Big Heading for Blog */}
      <header className="mb-16 text-center">
        <Drone className="mx-auto w-12 h-12 text-brand-orange dark:text-orange-400 mb-2" />

        <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-black dark:text-neutral-white">
          <span className="text-brand-orange">Blog</span>
        </h1>
        <p className="mt-4 text-xl text-neutral-gray-600 dark:text-neutral-gray-400 max-w-3xl mx-auto">
          Deep dives into UAV innovation, future flight technologies, and the
          latest developments from our engineering bay.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-12 items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <label className="text-sm font-semibold text-brand-orange dark:text-orange-400">
            Filter by Category:
          </label>
          <Select
            onValueChange={(val) =>
              setSelectedCategory(val === "all" ? "all" : Number(val))
            }
          >
            <SelectTrigger className="w-44 border-neutral-gray-300 dark:border-gray-500">
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
        </div>
        <div className="hidden md:block text-brand-orange font-bold text-2xl">
          |
        </div>
        <div className="flex items-center justify-center gap-2">
          <label className="text-sm font-semibold text-brand-orange dark:text-orange-400">
            Filter by Author:
          </label>
          <Select
            onValueChange={(val) =>
              setSelectedAuthor(val === "all" ? "all" : Number(val))
            }
          >
            <SelectTrigger className="w-44 border-neutral-gray-300 dark:border-gray-500">
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
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-xl hover:shadow-orange-300/50 transition-all duration-300 dark:bg-neutral-gray-800 dark:hover:shadow-orange-700/50 border-t-4 border-brand-orange dark:border-orange-500 rounded-xl"
            >
              {post.coverImage && (
                <img
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${post.coverImage?.formats?.thumbnail?.url}`}
                  alt={post.title || "No title"}
                  className="transition-transform duration-300 w-full h-48 object-cover"
                />
              )}
              <div className="p-6 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-neutral-black dark:text-neutral-white">
                  {post.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 text-xs text-neutral-gray-500 dark:text-neutral-gray-400">
                  <p className="font-semibold">
                    By {post.author?.name || "Unknown"}
                  </p>
                  <span className="text-xs">•</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>

                <p className="text-md text-neutral-gray-700 dark:text-neutral-gray-300 line-clamp-3 leading-relaxed">
                  {getPostText(post.content)}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
                  <div className="flex gap-2">
                    {post.categories?.map((cat) => (
                      <span
                        key={cat.id}
                        className="text-xs bg-orange-500/80 text-neutral-white px-3 py-1 text-center rounded-full font-medium shadow-sm"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button with Link Component */}
                  <Link
                    href={`/post/${post.slug}`}
                    className="group ml-auto cursor-pointer h-10 w-10 rounded-full flex justify-center items-center bg-brand-orange text-white hover:bg-orange-600 transition-colors"
                    aria-label={`Read post: ${post.title}`}
                  >
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-xl text-neutral-gray-500 dark:text-neutral-gray-400">
              No posts found matching the current filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
