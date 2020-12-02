import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Http from './api/Http';

const CreateNode = () => {
  const [node, setNode] = useState({
    title: "",
    body: "",
  });
  const [redirecNode, setRedirectNode] = useState(false);

  const InputEvent = (event) => {
    // let name = event.target.name;
    // let value = event.target.value;
    let { name, value } = event.target;
    setNode((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const submitEvent = (event) => {
    event.preventDefault();
    const { title, body } = node;

    async function addNode() {
      const data = {
        _links: {
          type: {
            href: `http://localhost/examples/drupal8/rest/type/node/article`,
          },
        },
        title: [
          {
            value: title,
          },
        ],
        type: [
          {
            target_id: "article",
          },
        ],
        body: [{ value: body }],
      };
      const response = await Http.post(`/entity/node?_format=hal_json`, data)
        .then((res) => {
          setRedirectNode(true);
          // <Redirect to="/" />;
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    }
    addNode();
  };

  if (redirecNode) return redirectTo();
  function redirectTo() {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">Create Node</h1>
      </div>

      <div className="container contact_div">
        <div className="row">
          <div className="col-md-6 col-10 max-auto max_auto">
            <div className="row">
              <form onSubmit={submitEvent}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={node.title}
                    onChange={InputEvent}
                    aria-describedby="emailHelp"
                    placeholder="Enter Title"
                  />
                  </div>
                <div className="form-group">
                  <label>Body</label>
                  <textarea
                    name="body"
                    className="form-control"
                    onChange={InputEvent}
                    rows="5"
                    defaultValue={node.body}
                    placeholder="Enter Message"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNode;
