import React, { useState } from "react";
import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState("");

    const handleInput = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/posts", {
                title
            });

            console.log(res);

            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    return <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input value={title} onChange={handleInput} className="fom-control" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
};

export default PostCreate;