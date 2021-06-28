import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keyword }) => {
  const url = 'http://localhost:3000';
  const image = '/favicons';

  return (
    <Helmet>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="robots" content="index, follow" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="canonical" href={url} />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

      {/* Google / Search Engine Tags  */}
      <meta itemprop="name" content="React Web Starter" />
      <meta itemprop="description" content="React Js Starter." />
      <meta itemprop="image" content="http://localhost:3000/favicon.png" />

      {/* Facebook OG meta tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags  */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={url} />
      <meta property="twitter:creator" content="@versucks" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:url" content={url} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "${title}",
          "image": ["${image}"],
          "author": {
            "@type": "Person",
            "@id": "https://twitter.com/versucks",
            "name": "Verdi Pratama",
            "url": "https://twitter.com/versucks"
          },
          "publisher": {
              "@type": "Person",
              "@id": "https://twitter.com/versucks",
              "name": "Verdi Pratama",
              "url": "https://twitter.com/versucks"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${url}"
          }
        }`,
        }}
      />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keyword: PropTypes.string,
};

export default SEO;
