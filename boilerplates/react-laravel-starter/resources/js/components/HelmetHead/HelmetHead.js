import React from 'react';
import Helmet from 'react-helmet';

class HelmetHead extends React.Component {
  render() {
    const { meta, link } = this.props;

    return (
      <Helmet>
        {meta
          ? meta.map((metas) =>
              metas.type === 'name' ? (
                <meta key={metas} name={metas.value} content={metas.content} />
              ) : (
                <meta
                  key={metas}
                  property={metas.value}
                  content={metas.content}
                />
              )
            )
          : ''}
        {link
          ? link.map((links) => (
              <link key={links} rel={links.rel} href={links.href} />
            ))
          : ''}
      </Helmet>
    );
  }
}

export default HelmetHead;
