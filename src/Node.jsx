import React from "react";

const Node = (props) => {
  console.log(props);
  return (
    <>
    <div className="col-md-10 col-10 ">
                <div className="row">
      
        <a
          href="#"
          className="list-group-item list-group-item-action flex-column align-items-start">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{props.title}</h5>
            <small>By: {props.author}</small>
          </div>
          <p className="mb-1">{props.body}</p>
        </a>
      
      </div>
      </div>
      <br />
    </>
  );
};

export default Node;
