import { SECTIONS, getTopic, unitsOfSection } from "@/lib/course/curriculum";
import {
  courseProgress,
  isTopicPlayable,
  readyShare,
  topicMastery,
  topicStates,
  type TopicState,
  unitProgress,
} from "@/lib/course/progress";
import type { UserProfile } from "@/lib/store/types";

export interface CourseSkyStar {
  id: string;
  title: string;
  blurb: string;
  state: TopicState;
  mastery: number;
  playable: boolean;
}

export interface CourseSkyUnit {
  id: string;
  title: string;
  subtitle: string;
  done: number;
  total: number;
  stars: CourseSkyStar[];
}

export interface CourseSkySection {
  cefr: string;
  title: string;
  units: CourseSkyUnit[];
}

export interface CourseSky {
  done: number;
  total: number;
  ready: number;
  sections: CourseSkySection[];
}

export function buildCourseSky(profile: UserProfile): CourseSky {
  const states = topicStates(profile);
  const progress = courseProgress(profile);
  const ready = readyShare();

  return {
    done: progress.done,
    total: progress.total,
    ready: ready.ready,
    sections: SECTIONS.map((section) => ({
      cefr: section.cefr,
      title: section.title,
      units: unitsOfSection(section).map((unit) => {
        const up = unitProgress(profile, unit.id);
        return {
          id: unit.id,
          title: unit.title,
          subtitle: unit.subtitle,
          done: up.done,
          total: up.total,
          stars: unit.topicIds
            .map((id) => {
              const topic = getTopic(id);
              if (!topic) return null;
              const state = states.get(id) ?? "soon";
              return {
                id,
                title: topic.title,
                blurb: topic.blurb,
                state,
                mastery: topicMastery(profile, id),
                playable: isTopicPlayable(state),
              };
            })
            .filter((star): star is CourseSkyStar => star !== null),
        };
      }),
    })),
  };
}
