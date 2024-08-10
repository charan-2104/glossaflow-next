import { getLesson, getUserProgress, getuserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "./quiz";

const LessonPage =async () => {

    const lessonPromise = getLesson();
    const userProgressPromise = getUserProgress();
    const userSubscriptionPromise = getuserSubscription();


    const [
        lesson,
        userProgress,
        userSubscription,
    ] = await Promise.all([
        lessonPromise,
        userProgressPromise,
        userSubscriptionPromise
    ]);

    if(!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage = lesson.challenges
        .filter((challenge) => challenge.completed)
        .length / lesson.challenges.length * 100

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenge={lesson.challenges}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={userSubscription}
        />
    )
} 

export default LessonPage;