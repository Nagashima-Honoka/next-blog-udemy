import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Layout, { siteTitle } from  "../components/Layout";
import { getPostsData } from "../lib/post";
import Link from "next/link";
import utileStyles from "../styles/utils.module.css";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, data, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

// //SSRの場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops

//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utileStyles.headingMd}>
        <p>
          駆け出しエンジニア/Next.jsキャッチアップ中.../上手くいかなかった時こそチャンスだーーー
        </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, data, thumbnail }) => (
            <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage} />
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utileStyles.boldText}>SSGとSSRの使い分けの場面はいつなのか?</a>
            </Link>
            <br />
            <small className={utileStyles.lightText}>{data}</small>
          </article>
          ))}
        </div>
      </section>
    </Layout>

  );
}
