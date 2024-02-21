import React, { useState } from 'react';
import map from 'lodash/map';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import filter from 'lodash/filter';
import flow from 'lodash/flow';
import ReactQuill from 'react-quill';

import type { CommentLink } from '@types';

import { awaitAll } from '@utils/helpers';
import { useScrapeMutation } from '@store/api/linkPreviewApi';

interface ProcessUrlsProps {
  editorRef: React.RefObject<ReactQuill> | any;
  previewLinks?: CommentLink[];
}

export const useProcessTextUrls = () => {
  const [scrapeUrl] = useScrapeMutation();

  const [urls, setUrls] = useState<string[]>([]);
  const [links, setLinks] = useState<CommentLink[]>([]);
  const [isScraping, setIsScraping] = useState<boolean>(false);

  const processUrls = (props: ProcessUrlsProps) => {
    const { editorRef, previewLinks } = props;

    setIsScraping(true);

    if (editorRef) {
      const { ops } = editorRef.current!.getEditor().getContents();

      const urls = flow(
        (ops) => filter(ops, (op) => op.attributes?.link),
        (ops) => map(ops, (op) => op.attributes?.link)
      )(ops);

      awaitAll(
        map(urls, (_url) => {
          const link = find(previewLinks ?? links, ({ url }) => isEqual(url, _url));

          if (!link) {
            return scrapeUrl({ url: _url })
              .unwrap()
              .then((data: CommentLink) => ({ ...data, has_preview: true }));
          } else {
            return { ...link, has_preview: true };
          }
        })
      )
        .then((result: CommentLink[]) => {
          const newLinks = map(filter(result), (link, index) => ({
            ...link,
            has_preview: isEqual(result.length - 1, index)
          }));

          setLinks(newLinks);
        })
        .finally(() => {
          setIsScraping(false);
        });
    }
  };

  const changeLinksProp = (key: string, value: any, links: CommentLink[]) =>
    map(links, (link) => ({
      ...link,
      [key]: value
    }));

  return {
    processUrls,
    changeLinksProp,
    links,
    isScraping,
    urls,
    setLinks,
    setUrls
  };
};
