import styles from "./worksSection.module.scss";
import MainTitle from "@/components/ui/MainTitle";
import WorkCard from "../workCard";
import { works } from "@/constants/constant";
import AnimatedButton from "@/components/ui/animatedButton";

const WorksSection = () => {
  return (
    <section className={`${styles.worksSection} wrapper`}>
      <div className="main_title">
        <MainTitle
          subtitle="Branded Experiences"
          title="that grow your business"
        />
          <AnimatedButton link="/works" text="See All" />
      </div>
      <div className={styles["experience-cards"]}>
        {[0, 1].map((colIndex) => (
          <div key={colIndex} className={styles.col}>
            {works.slice(colIndex * 2, colIndex * 2 + 2).map((work, index) => (
              <WorkCard
                key={work.id}
                {...work}
                imageClassName={
                  (colIndex + index) % 2 === 1
                    ? "h-[327px] md:h-[420px] lg:h-[624px]"
                    : "h-[327px] md:h-[420px] lg:h-[477px]"
                }
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorksSection;
