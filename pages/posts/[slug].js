import React from 'react'
import { GET_ALL_SLUGS, GET_INDIVIDUAL_POST } from '../graphql/queries'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import Head from 'next/head'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import moment from 'moment'

const client = new ApolloClient({
  uri: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9yahioc1ii101uobtuf63s5/master',
  cache: new InMemoryCache(),
})

function Post({ post, markdown }) {
  console.log(post)
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href={post.thumbnail.url} />
      </Head>
      <main className="grid grid-cols-12 mx-auto">
        <article className="col-span-8 col-start-3">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p>{moment(post.publishedAt).format('DD.MM.YYYY')}</p>
          </div>

          <img
            src={post.thumbnail.url}
            className="object-cover object-center w-full h-1/3 mb-8"
          />
          <div className="text-xl">
            <MDXRemote {...markdown} />
          </div>
        </article>
      </main>
    </>
  )
}

export default Post

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_SLUGS,
  })

  const paths = data.blogPosts.map((post) => {
    return {
      params: { slug: post.slug },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_INDIVIDUAL_POST,
    variables: { slugUrl: params.slug },
  })

  const html = await serialize(data.blogPosts[0].content.markdown)

  return {
    props: {
      post: data.blogPosts[0],
      markdown: html,
    },
  }
}
