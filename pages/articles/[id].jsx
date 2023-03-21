import React from "react";
import SubBanner from "../../components/SubBanner";
import Breadcrumb from "../../components/Breadcrumb";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";

const Article = ({ article }) => {
  return (
    <>
      <Head>
        <title>Bloggie - {article.title}</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <SubBanner />
      <Breadcrumb category={article.categories[0]} title={article.title} />
      <section className="text-gray-600 body-font">
        <div className="container px-5 pt-10 pb-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div class="rounded-lg h-96 overflow-hidden">
              <img
                alt="Article Thumbnail"
                class="object-cover object-center h-full w-full"
                src={article.thumbnailImg}
              />
            </div>

            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-10 h-10"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx={12} cy={7} r={4} />
                  </svg>
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg capitalize">
                    {article.username}
                  </h2>
                  <div className="w-12 h-1 bg-blue-600 rounded mt-2 mb-4" />
                  <p className="text-base"></p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <h1 className="font-medium title-font text-gray-900 text-3xl mb-12">
                  {article.title}
                </h1>
                <p className="leading-relaxed text-lg mb-4">
                  {article.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Article;

export async function getStaticPaths() {
  const articles = await axios
    .get(`${process.env.BASE_URL}/api/articles`)
    .then((res) => res.data);

  const paths = articles.map((article) => ({
    params: { id: article._id },
  }));
  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params }) => {
  const article = await axios.get(
    `${process.env.BASE_URL}/api/articles/${params.id}`
  );
  return {
    props: {
      article: article.data,
    },
    revalidate: 10,
  };
};
