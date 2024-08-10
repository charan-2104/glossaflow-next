import { redirect } from "next/navigation"

import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { UserProgress } from "@/components/user-progress"
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getuserSubscription
} from "@/db/queries"

import { Promo } from "@/components/promo"
import { Header } from "./header"
import { Unit } from "./unit"
import { Quests } from "@/components/quests"

const LearnPage = async () => {

  const userProgressPromise = getUserProgress();
  const courseProgressPromise = getCourseProgress()
  const lessonPercentagePromise = getLessonPercentage()
  const unitsPromise = getUnits();
  const userSubscriptionPromise = getuserSubscription();

  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    userProgressPromise,
    unitsPromise,
    courseProgressPromise,
    lessonPercentagePromise,
    userSubscriptionPromise
  ]);

  if(!userProgress || !userProgress.activeCourse) {
    redirect("/courses")
  }

  if(!courseProgress) {
     redirect("/courses")
  }

  const isPro = !!userSubscription?.isActive
  
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress 
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && (
          <Promo />
        )}
        <Quests points={userProgress.points}/>
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}/>
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={courseProgress.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />

          </div>
        ))} 
      </FeedWrapper>
    </div>
  )
}

export default LearnPage
