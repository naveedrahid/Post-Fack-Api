import React from 'react';

const CreatePost = () => {
    return (
        <div className="modal fade" id="create-post">
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
                        <h4 className="modal-title">Create Post</h4>
                    </div>
                    <div className="modal-body">
                        <form action="" method="POST" role="form" id="create-post-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="post_title"
                                    placeholder="Title"
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
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
