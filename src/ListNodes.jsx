import React, { useState, useEffect } from "react";
import axios from "axios";
import Http from './api/Http';

const ListNodes = () => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
      getNodes();
  }, []);

    async function getNodes() {
        //https://opencart-api.com/faq/no-access-control-allow-origin-header-is-present-on-the-requested-resource/
            const data = {'name':'admin', 'pass': 'admin1256$'}

            const res = await Http.get(`/rest/list/nodes?_format=json`)
            .then((res) => {
                console.log("AXIOS RESPONSE: ", res.data);
                setNodes(res.data); 
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
              <div className="col-md-6 col-10 max-auto max_auto">
                <div className="row">
                {
                    nodes.map(
                        (node, index) => {
                            return <h3 key={index}>{node.title}</h3>;
                        })
                }
    
                </div>
                </div>
                </div>
                </div>
        </>
      );
}

export default ListNodes;