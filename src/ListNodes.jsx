import React, { useState, useEffect } from "react";
import Http from "./api/Http";
import Node from "./Node";

const ListNodes = () => {
  const [nodes, setNodes] = useState([]);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    getNodes();
  }, []);

  async function getNodes() {
    const res = await Http.get(`/rest/list/nodes?_format=json`)
      .then((res) => {
        console.log("AXIOS RESPONSE: ", res.data);
        setNodes(res.data);
        setSpinner(false);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  }

  return (
    <>
      <div className="my-5">
        <h1 className="text-center">List Nodes</h1>
      </div>

      <div className="container contact_div">
        <div className="row">
        { (spinner) ? <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div> : ''  }
          {nodes.map((node, index) => {
            return (
              <Node
                key={index}
                title={node.title}
                body={node.body}
                author={node.uid}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ListNodes;
