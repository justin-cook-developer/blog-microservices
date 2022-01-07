import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState("");

    const handleInput = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                `http://localhost:4001/posts/${postId}/comments`, {
                content
            });

            setContent("");
        } catch (error) {
            console.error(error);
        }
    };

    return <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>New comment</label>
                <input
                    value={content}
                    onChange={handleInput}
                    className="fom-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
};


export default CommentCreate;