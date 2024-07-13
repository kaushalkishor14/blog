import React, { useState, useEffect } from "react";

import appwriteService from "../appwrite/conf";
import { Container, PostCard } from "../components";

function AllPosts() {
  const [posts, setPost] = useState([]);

  useEffect(() => {}, []);

  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPost(posts.documents);
    }
  });

  return (
    <div className=" w-full py-9">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
