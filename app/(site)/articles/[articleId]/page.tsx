"use client";

import { useEffect, useState } from "react";
import "firebase/compat/firestore";
import { getArticleDetails } from "../../service/firebase.service";
import { useParams } from "next/navigation";

export default function Article() {
  const params = useParams();
  var [article, updateArticle] = useState({
    title: "",
    para1: "",
    para2: "",
    para3: "",
    image1: "",
    image2: "",
  });

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    getArticleDetails(params["articleId"].toString()).then((val: any) => {
      updateArticle(val);
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 font-poppins">
          {article.title}
        </h1>

        <p className="text-lg leading-relaxed text-gray-700 mb-6 font-roboto">
          {article.para1}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div></div>
          <div className="flex justify-center">
            <img
              className="object-cover rounded-lg shadow-md"
              src={article.image1}
              alt="Article Image 1"
              style={{ height: "400px", width: "100%" }}
            />
          </div>
          <div></div>
        </div>

        <p className="text-lg leading-relaxed text-gray-700 mb-6 font-roboto">
          {article.para2}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div></div>
          <div className="flex justify-center">
            <img
              className="object-cover rounded-lg shadow-md"
              src={article.image2}
              alt="Article Image 2"
              style={{ height: "400px", width: "100%" }}
            />
          </div>
          <div></div>
        </div>

        <p className="text-lg leading-relaxed text-gray-700 font-roboto">
          {article.para3}
        </p>
      </div>
    </div>
  );
}
