import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Header />
      <img src="/Banner.png" alt="imagem" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <div className={styles.postTop}>
            <h1>Titulo de exemplo</h1>
            <ul>
              <li>
                <FiCalendar />
                12 Mar 2021
              </li>
              <li>
                <FiUser />
                Emerson Trindade
              </li>
              <li>
                <FiClock />5 min
              </li>
            </ul>
          </div>

          <article>
            <h2>titulo da seção</h2>
            <p>lorem ipsum dolor sit amet, consectetur adipiscing</p>
            lorem ipsum dolor <strong>
              {' '}
              sit amet, consectetur adipiscing
            </strong>{' '}
            lorem ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor
            sit amet, consectetur
            <a href="#"> adipiscing lorem ipsum dolor sit amet</a>, consectetur
            adipiscing lorem ipsum dolor sit amet, consectetur adipiscing lorem
            ipsum dolor sit amet, consectetur adipiscing lorem ipsum dolor sit
            amet, consectetur adipiscing lorem ipsum dolor sit amet, consectetur
            adipiscing
          </article>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('publication', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    }
  }
  console.log(post)

  return {};
};
