export type MediaData = {
  source: string;
  type: 'image' | 'video' | 'icon';
  alignment: 'left' | 'right' | 'center';
  order?: number;
  backgroundImage?: string;
};

export type HomeColorsData = {
  title: string;
  background: string;
  description?: string;
  icon?: string;
  iconBackground?: string;
  socialMediaBackground?: string;
};

export type HomeLink = {
  title: KeyString;
  slug: string;
};

export type HomeSocialMedia = {
  icon: string;
  link: string;
};

export type KeyString = {
  [key: string]: string;
};

export type HomeArticle = {
  id: number;
  title: KeyString;
  icon: string;
  slug: string;
};

export type HomeMediaSection = {
  id: number;
  type: 'media';
  title: KeyString;
  media: MediaData;
  colors: HomeColorsData;
  description?: KeyString;
};

export type HomeMainSection = {
  id: number;
  type: 'main';
  form: 'login' | 'register';
  title: KeyString;
  description: KeyString;
  alignment: 'left' | 'right';
  image: string;
  colors: HomeColorsData;
};

export type HomeArticleSection = {
  id: number;
  type: 'article';
  title: KeyString;
  description?: KeyString;
  articles: HomeArticle[];
  colors: HomeColorsData;
};

export type HomeFooterSection = {
  id: number;
  type: 'footer';
  links: HomeLink[];
  socialMedia: HomeSocialMedia[];
  colors: HomeColorsData;
};

export type HomePageData = {
  sections: (HomeMediaSection | HomeMainSection | HomeArticleSection | HomeFooterSection)[];
};
