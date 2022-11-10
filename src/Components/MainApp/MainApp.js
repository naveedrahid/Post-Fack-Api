import React, { useCallback, useEffect, useState } from 'react';
import Swal from "sweetalert2";
import CreatePost from '../CreatePost/CreatePost';
import Posts from '../Posts/Posts';
import EditPost from '../EditPost/EditPost';


const MainApp = () => {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [editPostData, setEditPostData] = useState(null);

    const baseUrl = `https://jsonplaceholder.typicode.com`;

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = useCallback(async () => {
        setLoading(true);
        await fetch(`${baseUrl}/posts`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error(error));
        setLoading(false);
    }, [posts]);

    const deletePost = async (event, postId) => {
        event.preventDefault();
        Swal.fire({
            title: "Are You Sure?",
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                await fetch(`${baseUrl}/posts/${postId}`, {
                    method: 'DELETE',
                })
                    .then(async () => {
                        await getPosts();
                    })
                    .catch((error) => console.error(error));
                setLoading(false);
                Swal.fire("Post is deleted successfully!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Post is not deleted successfully!", "", "info");
            }
        })
    }

    const editPost = useCallback(
        async (event, postId) => {
            event.preventDefault();
            setLoading(true);
            await fetch(`${baseUrl}/posts/${postId}`)
                .then((response) => response.json())
                .then((data) => {
                    setEditPostData(data);
                    let $ = window.$;
                    $("#edit-post-modal").modal("show");
                })
                .catch((error) => console.error(error));
            setLoading(false);
        }, [editPostData]);

    // if (loading) {
    //     return <h2>Loading.....</h2>;
    // }
    return (
        <>
            {loading && (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="container">
                <h1>Posts</h1>
                <a className="btn btn-primary" data-toggle="modal" href="#create-post">
                    Create Post
                </a>
                <CreatePost baseUrl={baseUrl} getPosts={getPosts} />
                <EditPost editPostData={editPostData} baseUrl={baseUrl} getPosts={getPosts} />
                {
                    posts.length > 0 ? (
                        <Posts posts={posts} deletePost={deletePost} editPost={editPost} />
                    ) : (
                        <h2>No Post Found!</h2>
                    )}
            </div>
        </>
    );
}

export default MainApp;
