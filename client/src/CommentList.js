import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const response = await axios.get(
            `http://localhost:4001/posts/${postId}/comments`
        );
        return response.data;
    };

    useEffect(() => {
        fetchComments()
            .then(setComments);
    }, [postId]);

    const renderedComments = comments.map((comment) => {
        return <li key={comment.id}>{comment.content}</li>;
    });

    return (
        <ul>{renderedComments}</ul>
    );
};

export default CommentList;