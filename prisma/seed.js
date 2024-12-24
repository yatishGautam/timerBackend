// Seed script for the Prisma database

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
	// Create Users
	const user = await prisma.user.create({
		data: {
			email: "testuser@example.com",
			passwordHash: "hashed_password",
		},
	});

	// Create Workouts
	const workout = await prisma.workout.create({
		data: {
			userId: user.id,
			name: "Full Body Workout",
			description: "A workout targeting all major muscle groups.",
		},
	});

	// Create Segments
	const segment1 = await prisma.segment.create({
		data: {
			workoutId: workout.id,
			name: "Warm-Up",
			sequenceOrder: 1,
		},
	});

	const segment2 = await prisma.segment.create({
		data: {
			workoutId: workout.id,
			name: "Strength Training",
			sequenceOrder: 2,
		},
	});

	// Create Exercises
	const exercise1 = await prisma.exercise.create({
		data: {
			name: "Push-Ups",
			description: "An upper body exercise.",
		},
	});

	const exercise2 = await prisma.exercise.create({
		data: {
			name: "Squats",
			description: "A lower body exercise.",
		},
	});

	const exercise3 = await prisma.exercise.create({
		data: {
			name: "Jumping Jacks",
			description: "A cardio exercise.",
		},
	});

	// Create Timers
	const timer1 = await prisma.timer.create({
		data: {
			type: "COUNTDOWN",
			duration: 30,
		},
	});

	const timer2 = await prisma.timer.create({
		data: {
			type: "INTERVAL",
			duration: 60,
			interval: 15,
		},
	});

	// Associate Exercises with Segments (SegmentExercise)
	await prisma.segmentExercise.createMany({
		data: [
			{
				segmentId: segment1.id,
				exerciseId: exercise1.id,
				timerId: timer1.id,
				sequenceOrder: 1,
			},
			{
				segmentId: segment1.id,
				exerciseId: exercise3.id,
				timerId: timer2.id,
				sequenceOrder: 2,
			},
			{
				segmentId: segment2.id,
				exerciseId: exercise2.id,
				timerId: timer1.id,
				sequenceOrder: 1,
			},
		],
	});

	console.log("Seed data created successfully!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
