import { createClient } from "@sanity/client";
const homeUrl = `*[_type == 'home']{
  title,
  homeContent,
  'thumbnail' : {
    'alt' : thumbnail.alt,
    'imageUrl' : thumbnail.asset  -> url,
  }
}`;
const profileUrl = `
*[_type == 'profile']{
  company,
  location,
  gitUrl,
  intro,
  'skills': skills[]{
    _type == 'reference' => @ -> {
      name
    },
    _type != 'reference' => @
  },
  'thumbnail' : {
    'alt' : thumbnail.alt,
    'imageUrl' : thumbnail.asset  -> url,
  }
}
`;
const devLogUrl = `*[_type == 'devLog']{
  name,
  createdAt
}`;

const categoryUrl = `*[_type == 'category']{
  name,
  type,
  slug,
  index
}`;

const subCategoryUrl = `
*[_type == 'subCategory' && references(*[_type=="category" && slug == $category]._id)]{
  name,
  type
}`;

const postInnerUrl = `
  _id,
  title,
  subtitle,
  createdAt,
  postContent,
  blockContent,
  viewCount,
  'category' : category -> {
    name,
    type,
    slug
  },
  'subCategory' : subCategory -> {
    name,
    type
  },
  'slug': slug.current,
  'thumbnail' : {
    'alt' : thumbnail.alt,
    'imageUrl' : thumbnail.asset  -> url,
  },
  'author' : author -> {
    name,
    role,
    'image' : image.asset -> url  
  },
  'tag': tag[]{
    _type == 'reference' => @ -> {
      title,
      'slug': slug.current
    }
  }
`;
const postCardInnerUrl = `
  _id,
  title,
  subtitle,
  createdAt,
  viewCount,
  'preview': select(
    defined(postContent.markdown) => postContent.markdown,
    defined(blockContent) => pt::text(blockContent),
    ""
  ),
  'category' : category -> {
    name,
    type,
    slug
  },
  'subCategory' : subCategory -> {
    name,
    type
  },
  'slug': slug.current,
  'thumbnail' : {
    'alt' : thumbnail.alt,
    'imageUrl' : thumbnail.asset  -> url,
  },
  'author' : author -> {
    name
  }
`;
const postAllUrl = `
*[_type == 'post']  | order(createdAt desc){
  ${postInnerUrl}
}`;
const postRecentUrl = `
*[_type == 'post']  | order(createdAt desc){
  ${postCardInnerUrl}
}[0...10]`;

const postPopularUrl = `
*[_type == 'post']  | order(viewCount desc){
  ${postCardInnerUrl}
}[0...5]`;

const postByCategoryUrl = `
*[_type == 'post' && references(*[_type=="category" && slug == $category]._id)] | order(createdAt desc){
  ${postCardInnerUrl}
}`;
const postByCategoryAndSubCategoryUrl = `
*[_type == 'post' && references(*[_type=="category" && slug == $category]._id)&& references(*[_type=="subCategory" && type == $subCategory]._id)] | order(createdAt desc){
  ${postCardInnerUrl}
}`;
const postByCategoryAndSubCategoryFullUrl = `
*[_type == 'post' && references(*[_type=="category" && slug == $category]._id)&& references(*[_type=="subCategory" && type == $subCategory]._id)] | order(createdAt desc){
  ${postInnerUrl}
}`;
const postBySlug = `
*[_type == 'post' && slug.current == $slug]{
  ${postInnerUrl}
}`;
const recentComment = `
*[_type == 'comment'] | order(createdAt desc){
  _id,
  postId,
  postSlug,
  postTitle,
  nickName,
  comment,
  replyCount,
  createdAt
}[0...5]`;
const commentByPostId = `
*[_type == 'comment' && postId == $id] | order(createdAt desc){
  _id,
  postId,
  postSlug,
  postTitle,
  nickName,
  comment,
  replyCount,
  createdAt
}[$start...$end]`;
const reCommentByCommentId = `
*[_type == 'reComment' && commentId == $id] | order(createdAt desc){
  _id,
  commentId,
  nickName,
  comment,
  createdAt
}[$start...$end]`;

const portpolioUrl = `
  *[_type == 'portpolio' && references(*[_type=="subCategory" && type == $subCategory]._id)]{
    'category' : category -> {
      name,
      type
    },
    shortContent,
    'skills': skills[]{
      _type == 'reference' => @ -> {
        name,
        'iconUrl' : iconUrl.asset -> url
      }
    },
    title,
    'author' : author -> {
      name,
      role,
      'image' : image.asset -> url  
    },
    repoUrl,
    demoUrl,
    portpolioContent,
    createdAt,
    'thumbnail' : {
      'alt' : thumbnail.alt,
      'imageUrl' : thumbnail.asset  -> url,
    }
  }
`;

const careerUrl = `
*[_type == 'career']{
  name,
  from,
  to,
  'works': works[]{
      _type == 'reference' => @ -> {
        name,
        from,
        to,
        description,
        'skills': skills[]{
          _type == 'reference' => @ -> {
            name,
            'iconUrl' : iconUrl.asset -> url
          }
        }
      }
    }
  }
`;
export default class SanityService {
  _client = createClient({
    dataset: "production",
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: "2022-06-18", // use a UTC date string
    token: process.env.SANITY_AUTH_TOKEN, // or leave blank for unauthenticated usage
    useCdn: process.env.NODE_ENV === "production",
  });
  async getHome() {
    const result = await this._client.fetch(homeUrl);
    return result;
  }
  async getDataBySlug({ slug }) {
    const result = await this._client.fetch(postBySlug, { slug });
    return result[0];
  }
  async getData({ type, category, subCategory, light = false }) {
    if (!type) return [];
    let result = [];
    if (type === "post") {
      if (!category) {
        result = await this._client.fetch(postAllUrl);
      } else if (category === "home") {
        result = await this._client.fetch(postRecentUrl);
      } else {
        if (!subCategory) {
          result = await this._client.fetch(postByCategoryUrl, {
            category,
          });
        } else {
          const query = light
            ? postByCategoryAndSubCategoryUrl
            : postByCategoryAndSubCategoryFullUrl;
          result = await this._client.fetch(query, {
            category,
            subCategory,
          });
        }
      }
    } else if (type === "portpolio") {
      result = await this._client.fetch(portpolioUrl, { subCategory });
    } else if (type === "career") {
      result = await this._client.fetch(careerUrl);
    } else if (type === "popular") {
      result = await this._client.fetch(postPopularUrl);
    } else {
      return [];
    }

    // 목록용 쿼리는 미리보기만 짧게 남긴다 (본문 전체 전송 방지)
    if (light || type === "popular" || (type === "post" && category)) {
      return (result || []).map((item) => {
        if (!item?.preview) return item;
        const normalized = String(item.preview).replace(/\s+/g, " ").trim();
        return {
          ...item,
          preview:
            normalized.length > 180
              ? `${normalized.slice(0, 180).trim()}…`
              : normalized,
        };
      });
    }
    return result;
  }
  async getPortpolio(subCategory) {
    return await this._client.fetch(portpolioUrl, { subCategory });
  }
  async getCareer() {
    return await this._client.fetch(careerUrl);
  }
  async getDevLog() {
    return await this._client.fetch(devLogUrl);
  }
  async getProfile() {
    return await this._client.fetch(profileUrl);
  }
  async getCategory() {
    const result = await this._client.fetch(categoryUrl);
    result.sort((a, b) => a.index - b.index);
    return result;
  }
  async getSubCategory(category) {
    const result = await this._client.fetch(subCategoryUrl, { category });
    return result;
  }
  async upCount({ id, count }) {
    this._client.patch(id).inc({ viewCount: 1 }).commit();
  }
  async setComment({ id, slug, title, nickName, comment, createdAt }) {
    const doc = {
      _type: "comment",
      postId: id,
      postSlug: slug,
      postTitle: title,
      nickName,
      comment,
      createdAt,
    };
    const result = await this._client.create(doc);
    return result;
  }
  async setReComment({ id, nickName, comment, createdAt }) {
    const doc = {
      _type: "reComment",
      commentId: id,
      nickName,
      comment,
      createdAt,
    };
    const result = await this._client.create(doc);
    return result;
  }
  async getCommentsById({ id, start, end }) {
    const result = await this._client.fetch(commentByPostId, {
      id,
      start,
      end,
    });
    return result;
  }
  async getRecentComments() {
    const result = await this._client.fetch(recentComment);
    return result;
  }
  async getReCommentsById({ id, start, end }) {
    const result = await this._client.fetch(reCommentByCommentId, {
      id,
      start,
      end,
    });
    return result;
  }
}
