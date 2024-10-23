import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';
import COMPONENT_MAP from '@/helpers/mdx-components';

export async function generateMetadata({ params }) {
  const { frontmatter: { title, abstract } } = await loadBlogPost(params.postSlug);

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract
  }
}

async function BlogPost({ params }) {
  const { frontmatter: { title, publishedOn }, content } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={title}
        publishedOn={publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
