import Head from "../../components/Head";

// Method 1: Using Next.js 13+ metadata API (Recommended)
export const metadata = {
  title: "About Us",
  description: "Learn more about our company and mission",
  keywords: ["about", "company", "mission", "team"],
  openGraph: {
    title: "About Us",
    description: "Learn more about our company and mission",
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Method 2: Using custom Head component for dynamic content */}
      <Head
        title="About Us | My Next.js App"
        description="Learn more about our company and mission"
        keywords="about, company, mission, team"
        ogImage="/about-og-image.jpg"
        canonical="/about"
      />

      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <p className="text-lg mb-4">
        Welcome to our company! We are passionate about creating amazing web
        applications.
      </p>
      <p className="text-lg mb-4">
        Our team consists of experienced developers who love working with modern
        technologies like Next.js, React, and JavaScript.
      </p>
    </div>
  );
}
