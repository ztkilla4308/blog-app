import { gql } from '@apollo/client'

const GET_HOME_POSTS = gql`
  query {
    blogPosts {
      publishedAt
      slug
      title
      thumbnail {
        url
      }
      description
    }
  }
`

const GET_ALL_SLUGS = gql`
  query {
    blogPosts {
      slug
    }
  }
`

const GET_INDIVIDUAL_POST = gql`
  query ($slugUrl: String!) {
    blogPosts(where: { slug: $slugUrl }) {
      title
      content {
        markdown
      }
      publishedAt
      thumbnail {
        url
      }
    }
  }
`

export { GET_ALL_SLUGS, GET_HOME_POSTS, GET_INDIVIDUAL_POST }
