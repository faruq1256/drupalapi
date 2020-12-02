import React, { useState } from "react";
import Http from './api/Http';

const CreateNode = (props) => {
  const [node, setNode] = useState({
    title: "",
    body: "",
  });

  const [spinner, setSpinner] = useState(false);

  const InputEvent = (event) => {

    let { name, value } = event.target;
    setNode((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };


  const buttonEvent = () => {
    setSpinner(true);
  }

  const submitEvent = (event) => {
    event.preventDefault();
    const { title, body } = node;

    async function addNode() {
      const data = {
        _links: {
          type: {
            href: `http://janari.in/drupal/rest/type/node/article`,
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
      const res = await Http.post(`/entity/node?_format=hal_json`, data)
        .then((res) => {
          setSpinner(false);
          props.history.push('/node/list');
        })
        .catch((err) => {
          console.log("AXIOS ERROR: ", err);
        });
    }
    addNode();
  };

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
                <button type="submit" className="btn btn-primary" onClick={buttonEvent}>
                  Create
                </button>
                { (spinner) ? <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div> : ''
                  
                }
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNode;
