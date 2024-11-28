'use client';
import Footer from '@/app/components/footer';
import Navbar from '@/app/components/navbar';
import Head from 'next/head';
import Image from 'next/image';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>All In One Generation</title>
        <meta name="description" content="Manage all your social media messages in one place." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-white py-16 px-4 md:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">All In One Generation</h1>
        <p className="text-lg text-center mb-8">Leverage the power of AI for seamless content creation, social media management, and more.</p>
        <div className="flex justify-center">
          <Image src="/image-creator-T02_juice.webp" alt="AI Illustration" width={400} height={300} className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our AI Generation Programs</h2>
        <p className="text-center mb-8">Explore the wide range of AI programs designed to simplify your content creation and management needs.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">AI Text Generator</h3>
            <p>Generate articles, blog posts, and social media content with ease. Enhance your content strategy with AI-powered writing.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">AI Image Generator</h3>
            <p>Create stunning visuals, illustrations, and digital art with our powerful AI image generation tools.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">AI Voice Generator</h3>
            <p>Generate realistic human-like voices for podcasts, video narration, and virtual assistants.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">AI Video Generator</h3>
            <p>Transform your ideas into video content with AI-powered editing and video synthesis.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">AI Music Generator</h3>
            <p>Compose music tracks and soundscapes tailored to your creative projects, with AI-driven music generation.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-2">AI Code Generator</h3>
            <p>Boost productivity by generating code snippets and aiding in development tasks with our intelligent code generators.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-12 px-4 md:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Get Started Today!</h2>
        <p className="text-center mb-6">Ready to transform your creative processes and streamline your workflow? Sign up now and access all our AI tools.</p>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
            Sign Up for Free
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
