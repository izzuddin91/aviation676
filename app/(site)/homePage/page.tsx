"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getLatestThreeArticle } from "../service/firebase.service";
import  VideoBackground  from "@/app/component/VideoBackground";

export default function Articles() {
  const router = useRouter();
  const [articles, updateArticles]: any = useState([{}]);

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

  return (
        <VideoBackground />
  );
}
