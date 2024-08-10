import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema })

const main = async() => {
    try{
        console.log("Seeding the database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            {
                id:1,
                title: "Spanish",
                imageSrc: "/es.svg"

            },
            {
                id:2,
                title: "Italian",
                imageSrc: "/it.svg"

            },
            {
                id:3,
                title: "Croatian",
                imageSrc: "/hr.svg"

            },
            {
                id:4,
                title: "French",
                imageSrc: "/fr.svg"

            },
        ]);

        await db.insert(schema.units).values([
            {
                id:1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of Spanish",
                order: 1
            }
        ]);

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 1,
                title: "Nouns",
            },
            {
                id:2,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 2,
                title: "Nouns",
            },
            {
                id:3,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 3,
                title: "Nouns",
            },
            {
                id:4,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 4,
                title: "Nouns",
            },
            {
                id:5,
                unitId: 1, // Unit 1 (Learn the basics...)
                order: 5,
                title: "Nouns",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1, // Nouns
                type: "SELECT",
                order: 1,
                question: 'Which of the these is the "the boy"?',
            },
            {
                id: 2,
                lessonId: 1, 
                type: "ASSIST",
                order: 2,
                question: '"the girl"',
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1, // Which of the these is the "the boy"?
                imageSrc: "/boy.svg",
                correct: true,
                text: "el chico",
                audioSrc: "/es_boy.mp3"
            },
            {
                id: 2,
                challengeId: 1, 
                imageSrc: "/girl.svg",
                correct: false,
                text: "la nina",
                audioSrc: "/es_girl.mp3"
            },
            {
                id: 3,
                challengeId: 1, 
                imageSrc: "/zombie.svg",
                correct: false,
                text: "el zombie",
                audioSrc: "/es_zombie.mp3"
            },
        ]),

        await db.insert(schema.challengeOptions).values([
            {
                id: 4,
                challengeId: 2, // "the boy"?
                correct: false,
                text: "el chico",
                audioSrc: "/es_boy.mp3"
            },
            {
                id: 5,
                challengeId: 2, 
                correct: true,
                text: "la nina",
                audioSrc: "/es_girl.mp3"
            },
            {
                id: 6,
                challengeId: 2, 
                correct: false,
                text: "el zombie",
                audioSrc: "/es_zombie.mp3"
            },
        ]),

        await db.insert(schema.challenges).values([
            {
                id: 3,
                lessonId: 2, // Nouns
                type: "SELECT",
                order: 1,
                question: 'Which of the these is the "the girl"?',
            },
            {
                id: 4,
                lessonId: 2, 
                type: "ASSIST",
                order: 2,
                question: '"the boy"',
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                id:7,
                challengeId: 3, // Which of the these is the "the girl"?
                imageSrc: "/boy.svg",
                correct: false,
                text: "el chico",
                audioSrc: "/es_boy.mp3"
            },
            {
                id:8,
                challengeId: 3, 
                imageSrc: "/girl.svg",
                correct: true,
                text: "la nina",
                audioSrc: "/es_girl.mp3"
            },
            {
                id:9,
                challengeId: 3, 
                imageSrc: "/zombie.svg",
                correct: false,
                text: "el zombie",
                audioSrc: "/es_zombie.mp3"
            },
        ]),

        await db.insert(schema.challengeOptions).values([
            {
                id:10,
                challengeId: 4, 
                correct: true,
                text: "el chico",
                audioSrc: "/es_boy.mp3"
            },
            {
                id:11,
                challengeId: 4, 
                correct: false,
                text: "la nina",
                audioSrc: "/es_girl.mp3"
            },
            {
                id:12,
                challengeId: 4, 
                correct: false,
                text: "el zombie",
                audioSrc: "/es_zombie.mp3"
            },
        ]),

        console.log("Seeding finished");
        
    } catch(error) {
        console.error(error);
        throw new Error("Failed to seed the database")
    }
}

main();