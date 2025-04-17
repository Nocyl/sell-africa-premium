
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import CourseGrid from "@/components/courses/CourseGrid";
import CourseFilters from "@/components/courses/CourseFilters";
import NewsletterSection from "@/components/home/NewsletterSection";

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PageHeader 
          title="Online Courses" 
          description="Développez vos compétences avec nos formations en ligne conçues pour le marché africain."
          bgColor="bg-worldsell-earth-100"
        />
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <CourseFilters />
            </div>
            <div className="lg:col-span-3">
              <CourseGrid />
            </div>
          </div>
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
