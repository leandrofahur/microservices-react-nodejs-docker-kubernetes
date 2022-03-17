import React, { useState } from "react";
import axios from "axios";

function PostCreate() {
  const [title, setTitle] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();

    await axios.post("http://localhost:4000/posts", { title });
    setTitle("");
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default PostCreate;
