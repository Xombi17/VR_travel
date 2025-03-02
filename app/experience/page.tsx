import PageTransition from "@/components/page-transition"
import ExperienceHeader from "@/components/experience-header"
import ExperienceCategories from "@/components/experience/experience-categories"
import ExperienceDevices from "@/components/experience/experience-devices"
import ExperienceFeatured from "@/components/experience/experience-featured"
import ExperienceTestimonials from "@/components/experience/experience-testimonials"

export default function ExperiencePage() {
  return (
    <PageTransition>
      <ExperienceHeader />
      <div className="container mx-auto px-4 py-16">
        <ExperienceCategories />
        <ExperienceFeatured />
        <ExperienceDevices />
        <ExperienceTestimonials />
      </div>
    </PageTransition>
  )
}

