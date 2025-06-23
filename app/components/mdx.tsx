import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index} className="border border-gray-600 px-2 sm:px-4 py-1 sm:py-2 text-left neon-text-red text-xs sm:text-sm">{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index} className="border-b border-gray-700">
      {row.map((cell, cellIndex) => (
        <td key={cellIndex} className="border border-gray-600 px-2 sm:px-4 py-1 sm:py-2 text-gray-300 text-xs sm:text-sm">{cell}</td>
      ))}
    </tr>
  ))

  return (
    <div className="overflow-x-auto my-4 sm:my-6">
      <table className="w-full border border-gray-600 bg-black/50">
        <thead className="bg-gray-800">
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props} className="text-red-400 hover:text-red-300 underline decoration-red-500/50 hover:decoration-red-400 transition-colors">
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} className="text-red-400 hover:text-red-300 underline decoration-red-500/50 hover:decoration-red-400 transition-colors" />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} className="text-red-400 hover:text-red-300 underline decoration-red-500/50 hover:decoration-red-400 transition-colors" />
}

function RoundedImage(props) {
  return (
    <div className="my-4 sm:my-6">
      <Image 
        alt={props.alt} 
        className="rounded-lg border border-gray-600 shadow-lg w-full h-auto" 
        {...props} 
      />
    </div>
  )
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return (
    <code 
      dangerouslySetInnerHTML={{ __html: codeHTML }} 
      {...props} 
      className="bg-black/80 border border-red-500/50 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-red-400 text-xs sm:text-sm"
    />
  )
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children)
    const headingClasses = {
      1: 'neon-text-red text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider mb-4 sm:mb-6',
      2: 'neon-text-red text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide mb-3 sm:mb-4',
      3: 'neon-text-white text-lg sm:text-xl lg:text-2xl uppercase tracking-wide mb-2 sm:mb-3',
      4: 'neon-text-red text-base sm:text-lg lg:text-xl uppercase tracking-wide mb-2',
      5: 'neon-text-white text-sm sm:text-base lg:text-lg uppercase tracking-wide mb-2',
      6: 'neon-text-red text-xs sm:text-sm lg:text-base uppercase tracking-wide mb-2'
    }
    
    return React.createElement(
      `h${level}`,
      { 
        id: slug,
        className: headingClasses[level]
      },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor opacity-0 hover:opacity-100 transition-opacity ml-2 text-gray-500 hover:text-red-400',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

// Custom pre component for code blocks
function Pre({ children, ...props }) {
  return (
    <pre 
      {...props} 
      className="bg-black/90 border border-red-500/50 rounded-lg p-3 sm:p-4 overflow-x-auto my-4 sm:my-6 text-xs sm:text-sm"
    >
      {children}
    </pre>
  )
}

// Custom blockquote component
function Blockquote({ children, ...props }) {
  return (
    <blockquote 
      {...props} 
      className="border-l-4 border-red-500 pl-3 sm:pl-4 my-4 sm:my-6 italic text-gray-300 bg-red-500/10 py-2 sm:py-3 text-sm sm:text-base"
    >
      {children}
    </blockquote>
  )
}

let components = {
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
  p: ({ children, ...props }) => (
    <p {...props} className="text-gray-300 leading-relaxed mb-3 sm:mb-4 text-sm sm:text-base">
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul {...props} className="list-disc list-inside text-gray-300 mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol {...props} className="list-decimal list-inside text-gray-300 mb-3 sm:mb-4 space-y-1 text-sm sm:text-base">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li {...props} className="text-gray-300 text-sm sm:text-base">
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong {...props} className="font-bold text-white text-sm sm:text-base">
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em {...props} className="italic text-gray-200 text-sm sm:text-base">
      {children}
    </em>
  ),
}

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
