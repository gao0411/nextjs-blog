export async function getPostRawContent(slug: string) {
  const res = await fetch(`/api/blog/${slug}`);
  if (!res.ok) {
    console.error("Failed to fetch blog content:", res.statusText);
    return null;
  }
  const data = await res.json();
  return data.rawContent;
}

export async function savePostContent(slug: string, content: string) {
  const res = await fetch(`/api/blog/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    console.error("Failed to save blog content:", res.statusText);
    return false;
  }
}

export async function createNewPost(slug: string, content: string) {
  const res = await fetch(`/api/blog/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ slug, content }),
  });

  if (!res.ok) {
    console.error("创建博客失败:", res.statusText);
    return false;
  }
}
