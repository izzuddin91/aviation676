"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestThreeArticle } from "../service/firebase.service";
import { LoadingIndicator } from "@/app/component/indicator/Loading";
import  VideoBackground  from "@/app/component/VideoBackground";

export default function Articles() {
  const router = useRouter();
  var [articles, updateArticles]: any = useState([{}]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    getLatestThreeArticle().then((val) => {
      updateArticles(val);
    });
  }

  function articleDetails(articleId: string) {
    router.push("/articles/" + articleId);
  }

  return(
    <div>
      <VideoBackground />
    </div>
  )
  // return (
  //   <div className="grid lg:grid-cols-6 gap-4 p-4">
  //     {articles ? (
  //       articles.map((article: any, i: any) => {
  //         return (
  //           <div
  //             key={i}
  //             className="lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg"
  //           >
  //             <div className="flex flex-col w-full pb-4">
  //               <p className="text-2xl font-bold">
  //                 { article["title"] }
  //               </p>
  //               <br />
  //               <p className="text-gray-600">
  //                 { (`${article["para1"]}`).substring(0, 200) + "..." }
  //               </p>
  //               <br />
  //               <p className="bg-violet-200 flex justify-center items-center p-3 rounded-lg">
  //                 <button
  //                   onClick={() => {
  //                     articleDetails(article["id"]);
  //                   }}
  //                   className="text-violet-700 text-lg"
  //                 >
  //                   Read More
  //                 </button>
  //               </p>
  //             </div>
  //           </div>
  //         );
  //       })
  //     ) : (
  //       <LoadingIndicator />
  //     )}
  //   </div>
  // );
}
