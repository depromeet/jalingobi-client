import Image, { ImageLoaderProps, ImageProps } from 'next/image';

export default function ImageLoader(props: Omit<ImageProps, 'loader'>) {
  const contentFulLoader = ({ src, quality, width }: ImageLoaderProps) => {
    const params = [`w=${width}`];

    if (quality) {
      params.push(`q=${quality}`);
    }

    return `${src}?${params.join('&')}`;
  };

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image loader={contentFulLoader} {...props} />;
}
