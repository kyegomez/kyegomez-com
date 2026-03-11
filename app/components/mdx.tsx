import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import React from 'react';

function Table({ data }) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function CustomLink(props) {
  const href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props) {
  return (
    <div className="mdx-image">
      <Image alt={props.alt} className="w-full h-auto" {...props} />
    </div>
  );
}

function Code({ children, ...props }) {
  const className = props.className ?? '';
  const isBlock = typeof className === 'string' && className.includes('language-');

  if (!isBlock) {
    return <code {...props}>{children}</code>;
  }

  const code = typeof children === 'string' ? children : String(children ?? '');
  const codeHTML = highlight(code.replace(/\n$/, ''));
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function createHeading(level) {
  const Heading = ({ children }) => {
    const slug = slugify(children);

    return React.createElement(
      `h${level}`,
      { id: slug, className: 'mdx-heading' },
      [
        React.createElement('span', { key: `text-${slug}` }, children),
        React.createElement(
          'a',
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            className: 'anchor-link',
            'aria-label': 'Anchor link',
          },
          '#'
        ),
      ]
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function Pre({ children, ...props }) {
  return <pre {...props}>{children}</pre>;
}

function Blockquote({ children, ...props }) {
  return <blockquote {...props}>{children}</blockquote>;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: Pre,
  blockquote: Blockquote,
  Table,
};

export function CustomMDX(props) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
