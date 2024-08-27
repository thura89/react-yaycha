// Get API Base Route
const api = import.meta.env.VITE_API;

// get LocalStorage token
const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Post User
 */
export const postUser = async (data) => {
  const res = await fetch(`${api}/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json();
  }

  console.log({ url: api });
  throw new Error("Error: check network log");
};

/**
 * Login
 */
export const postLogin = async (username, password) => {
  const res = await fetch(`${api}/login`, {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res.json();
  }

  throw new Error("Incorrect username or password");
};

/**
 * Fetch User Data
 */
export const fetchUser = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

/**
 * Fetch User Varify
 */

export const fetchVerify = async () => {
  const token = getToken();
  const res = await fetch(`${api}/varify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return false;
  }
  return res.json();
};

/**
 * FetchPost
 */

export const fetchPost = async () => {
  const token = getToken();
  const res = await fetch(`${api}/content/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * Creat Post
 */
export const createPost = async (content) => {
  const token = getToken();
  const res = await fetch(`${api}/content/posts`, {
    method: "POST",
    body: JSON.stringify({ content }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Error: Check Network log");
};

/**
 * Delete Post
 */

export const deletePost = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    return res.text();
  }
  throw new Error("Error: Check Network log");
};

/**
 * Create Comment
 */

export const createComment = async (content, postId) => {
  const token = getToken();
  const res = await fetch(`${api}/content/comments`, {
    method: "POST",
    body: JSON.stringify({ content, postId }),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Error: Check Network log");
};

/**
 * Delete Comment
 */

export const deleteComment = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/comments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return res.text();
  }
  throw new Error("Error: Check Network log");
};

/**
 * Post Post Like
 */

export const postPostLike = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/like/posts/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * get Post Like
 */

export const fetchPostLikes = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/like/posts/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * Delete Post Like
 */

export const deletePostLike = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/unlike/posts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * Post Comment Like
 */

export const postCommentLike = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/like/comments/${id}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * get Comment Like
 */

export const fetchCommentLikes = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/like/comments/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * DELETE Comment Like
 */

export const deleteCommentLike = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/content/unlike/comments/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * Post Follow User
 */

export const postFollow = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/follow/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * Delete Follow User
 */

export const deleteFollow = async (id) => {
  const token = getToken();
  const res = await fetch(`${api}/follow/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * Search User
 */

export const fetchQuery = async (query) => {
  const token = getToken();
  const res = await fetch(`${api}/search?query=${query}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return res.json();
  }
};

/**
 * Fetch following Post
 */

export const fetchFollowingPosts = async () => {
  const token = getToken();
  const res = await fetch(`${api}/content/following/posts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    return res.json();
  }
};
