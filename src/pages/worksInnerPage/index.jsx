import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Header from "@/components/app/header";
import WorkOverview from "@/components/app/workOverview";
import WorkInfoSection from "@/components/app/workInfoSection";
import WorksView from "@/components/app/worksView";
import OurGoal from "@/components/app/ourGoalSection";
import SeeMoreWorks from "@/components/app/seeMoreWorks";
import GetInTouchSection from "@/components/app/getInTouchSection";
import { works, workInfoCommon } from '@/constants/constant';

const WorksInnerPage = () => {
  const { id } = useParams();
  const currentWork = works.find(work => work.id.toString() === id);

  if (!currentWork) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Work not found</h1>
        <p>Sorry, the requested work could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentWork.title} | SHI Studio</title>
        <meta name="description" content={`SHI Studio - ${currentWork.description}`} />
      </Helmet>
      
      <div className="divider">
        <Header />
        <WorkOverview 
          title={currentWork.title} 
          short_description={currentWork.short_description} 
          image={currentWork.image} 
        />

        <WorkInfoSection 
          title={currentWork.title}
          viewFullSiteLink={currentWork.project_url}
          viewFullSiteText={workInfoCommon.viewFullSiteText}
          short_description={currentWork.short_description}
          description={currentWork.description}
          behanceLink={currentWork.project_behance_url}
          projectDetails={[
            { title: "Year", content: currentWork.year },
            { title: "Client", content: currentWork.client },
            { title: "Industry", content: Array.isArray(currentWork.industry) ? currentWork.industry.join(", ") : currentWork.industry },
            { title: "Services", content: currentWork.tags.map(tag => tag.name).join(", ") },
            { title: "Collaborators", content: Array.isArray(currentWork.collaborators) ? currentWork.collaborators.join(", ") : currentWork.collaborators },
          ]}
        />

        <WorksView
          primaryImage={currentWork.primaryImage}
          childImageOne={currentWork.childImageOne}
          childImageTwo={currentWork.childImageTwo}
          childImageThree={currentWork.childImageThree}
        />

        <OurGoal
          goalName="Product goal and objectives"
          goalContent={currentWork.description}
          statistics={false}
        />

        <WorksView
          primaryImage={currentWork.childImageOne || "/images/works-image-1.jpeg"}
          childImageOne={currentWork.childImageTwo || "/images/works-image-2.png"}
          childImageTwo={currentWork.childImageThree || "/images/works-image-3.png"}
        />
        <SeeMoreWorks currentWorkId={currentWork.id} title={currentWork.title}
          viewFullSiteLink={currentWork.project_url}
          viewFullSiteText={workInfoCommon.viewFullSiteText}
          short_description={currentWork.short_description}
          />
        <GetInTouchSection />
      </div>
    </>
  );
};

export default WorksInnerPage;

