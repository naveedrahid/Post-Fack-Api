import React, { memo, useEffect, useState } from 'react';

const EditPost = (props) => {
    const {editPostData, baseUrl, getPosts} = props;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editPostId, seteditPostId] = useState(null);

    useEffect(() => {
        setTitle(editPostData?.title);
        setBody(editPostData?.body);
        seteditPostId(editPostData?.id);
      }, [editPostData]);

    const titleInputChangeHandler = (event) =>{
        event.preventDefault();
        setTitle(event.target.value);
    }
    const bodyInputChangeHandler = (event) =>{
        event.preventDefault();
        setBody(event.target.value);
    }

    const onEditFormSubmitHandler = (event) =>{
        event.preventDefault();
        const formBody ={
            title,
            body
        }
        fetch(`${baseUrl}/posts/${editPostId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'PUT',
            body: JSON.stringify(formBody),
        })
        .then(() => {
            setTitle('');
            setBody('');
            getPosts();
            let $ = window.$;
            $("#edit-post-modal").modal("hide");
        })
        .catch((error) => console.error(error));
    }
    return (
        <>
            <div className="modal fade" id="edit-post-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-hidden="true"
                            >
                                &times;
                            </button>
                            <h4 className="modal-title">Edit Post</h4>
                        </div>
                        <div className="modal-body">
                            <form
                                method="POST"
                                role="form"
                                id="create-post-form"
                                onSubmit={onEditFormSubmitHandler}
                            >
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="post_title"
                                        placeholder="Title"
                                        onChange={titleInputChangeHandler}
                                        value={title}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Body</label>
                                    <textarea
                                        name=""
                                        id="post_body"
                                        cols="30"
                                        rows="10"
                                        placeholder="Body"
                                        className="form-control"
                                        onChange={bodyInputChangeHandler}
                                        value={body}
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Update Post
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(EditPost);
