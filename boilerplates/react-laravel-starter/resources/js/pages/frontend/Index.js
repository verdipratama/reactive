import React from 'react';
import Helmet from 'react-helmet';
import MetaTags from 'react-meta-tags';

export default function Index() {
  return (
    <div className="app-wrapper">
      <Helmet title="Home - Reactively" />
      <MetaTags>
        <title>Reactively - The Modern Monolith</title>
        <meta name="description" content="Some description." />
        <meta property="og:title" content="MyApp" />
        <meta property="og:image" content="path/to/image.jpg" />
      </MetaTags>

      <div className="z-50 w-full text-gray-500 border-b border-blueGray-900 bg-blue-1300 lg:px-20">
        <div className="flex flex-col max-w-screen-xl mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between p-4">
            <a href="#0" className="focus:outline-none">
              <h1 className="text-2xl font-bold tracking-tighter text-white uppercase lg:text-3xl title-font">
                reactively
                <span className="text-xs">©</span>
              </h1>
            </a>
            <button className="rounded-xl md:hidden focus:outline-none">
              <svg
                fill="#ffffff"
                viewBox="0 0 20 20"
                className="w-12 h-12"
              ></svg>
            </button>
          </div>
        </div>
      </div>

      <section className="bg-blue-1300 body-font">
        <div className="container justify-center px-5 py-10 pt-4 mx-auto lg:px-24">
          <div className="flex flex-col w-full mb-2">
            <h2 className="w-full mx-auto mb-6 text-xs font-semibold tracking-widest text-white">
              COZ WE AIN'T GOT TIME FOR THAT..
            </h2>
            <h1 className="text-6xl font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-teal-1000 to-yellow-1000 lg:text-5xl xl:text-9xl md:text-4xl">
              Modern Monolith,-
            </h1>
          </div>
          <div className="flex flex-col w-full mb-4 lg:text-center">
            <p className="text-xl font-normal leading-relaxed tracking-tight text-left text-blueGray-400 lg:w-1/2">
              <span className="font-semibold tracking-tighter uppercase text-teal-1000">
                REACTIVELY
              </span>
              {''} is an open source growing collection of layout blocks and
              components built with Tailwind CSS V2 ready to copy paste on your
              Tailwind project, bla, bla, bla...
            </p>
          </div>
        </div>
      </section>

      <footer className="pt-10 border-t border-gray-800 body-font">
        <p className="mb-4 text-sm font-semibold text-center text-white lg:mr-6 lg:mb-0">
          COMMING SOON!
        </p>
      </footer>

      <footer className="mt-10 border-t border-gray-800 body-font">
        <div className="container flex flex-col flex-wrap items-center px-5 py-6 mx-auto md:flex-row md:flex-no-wrap lg:px-20">
          <p className="mb-4 text-sm font-semibold text-center text-white lg:mr-6 lg:mb-0">
            Released under the MIT License Copyright 2021 © Verdi Pratama
          </p>
        </div>
      </footer>
    </div>
  );
}
