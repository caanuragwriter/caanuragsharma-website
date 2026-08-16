"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

interface ArticleEngagementProps {
  slug: string;
  initialViews: number;
  initialLikes: number;
}

export default function ArticleEngagement({
  slug,
  initialViews,
  initialLikes,
}: ArticleEngagementProps) {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const viewedKey = `viewed-${slug}`;

    if (!sessionStorage.getItem(viewedKey)) {
      sessionStorage.setItem(viewedKey, "true");

      supabase
        .rpc("increment_article_view", {
          article_slug: slug,
        })
        .then(({ data }) => {
          if (data !== null) {
            setViews(Number(data));
          }
        });
    }
  }, [slug]);

  const handleLike = async () => {
    if (liked) return;

    const supabase = createClient();

    const { data } = await supabase.rpc("increment_article_like", {
      article_slug: slug,
    });

    if (data !== null) {
      setLikes(Number(data));
      setLiked(true);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
      <span>
  👁 {views} {views === 1 ? "View" : "Views"}
</span>

<button
  onClick={handleLike}
  className="hover:text-blue-700 transition"
>
  ♥ {likes} {likes === 1 ? "Like" : "Likes"}
</button>
    </div>
  );
}