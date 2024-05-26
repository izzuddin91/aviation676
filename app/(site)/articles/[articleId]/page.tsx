"use client";

import { useEffect, useState } from "react";
import "firebase/compat/firestore";
import {
  getArticleDetails,
  getLatestThreeArticle,
} from "../../service/firebase.service";
import { useParams } from "next/navigation";
import { title } from "process";

export default function Article() {
  const params = useParams();
  var [article, updateArticle] = useState({title: "", para1: "", para2: "", para3: "", image1: "", image2: ""});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    getArticleDetails(params["articleId"].toString()).then((val: any) => {
      updateArticle(val);
    });
  }

  return (
    <div className="grid lg:grid-cols-1 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">{article.title}</p>
          <br />
          <p className="text-gray-600">
          {article.para1}
          </p>
          <br />
          <div
            style={{ height: "450px" }}
            className="h-56 grid grid-cols-3 gap-4 content-evenly h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg"
          >
            <div></div>
            <div>
              <img
                className="object-contain rounded-lg"
                src={ article.image1 }
                alt=""
                style={{ height: "400px" }}
              />
            </div>
            <div></div>
          </div>

          <br />
          <p className="text-gray-600">
          {article.para2}
          </p>
          <br />
          <div
            style={{ height: "450px" }}
            className="h-56 grid grid-cols-3 gap-4 content-evenly h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg"
          >
            <div></div>
            <div>
              <img
                className="object-contain rounded-lg"
                src={ article.image2 }
                alt=""
                style={{ height: "400px" }}
              />
            </div>
            <div></div>
          </div>
          <br />
          <p className="text-gray-600">
          {article.para3}
          </p>
        </div>
      </div>
    </div>
  );
}
