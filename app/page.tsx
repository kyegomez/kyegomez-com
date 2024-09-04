import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Kye Gomez's Home Page
      </h1>
      <p className="mb-4">
        {`Hellow, I'm Kye Gomez, and I build neural networks. 
        I've been programming since I was 12 years old, and today, I lead Agora, an open-source AI research lab non-profit with over 8,200 researchers worldwide. 
        We've successfully trained thousands of models and continue to push the boundaries of AI innovation.

        I'm also working on Swarms, a framework for orchestrating millions of agents to automate recurring enterprise operations. 
        If you're interested in AI research or neural networks, check out my work on GitHub and YouTube, where I share insights, projects, and tutorials.`}
      </p>
      <div className="my-8">
        {/* <BlogPosts /> */}
      </div>
    </section>
  )
}
