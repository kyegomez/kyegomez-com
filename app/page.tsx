import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Kye Gomez
      </h1>
      <p className="mb-4">
        {`My name is Kye Gomez and I build neural nets. I've been programming since I was 12 years old.
        I never finished high school because I'm low IQ and never went to college because I'm lazy but I lead
        Agora, an open source AI Research lab with 8,200+ researchers. We've trained thousands of models. And, I'm also building the 
        swarms `}
      </p>
      <div className="my-8">
        {/* <BlogPosts /> */}
      </div>
    </section>
  )
}
