import prisma from "@/app/Utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    // If the user Id does not exist then it is unauthorized
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } = await req.json();
    //Let's do the validation. If any field is missing
    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }

    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    //We are going to use prisma for putting data in the database.
    // Here we are  creating a new task with the provided details.
    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    // console.log("Task Created: ", task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    // Now we have to fetch the data inserted for the task by the user.
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
    });
    // console.log("TASKS ", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("ERROR GETTING TASKS: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { userId } = auth();
    const { isCompleted, id } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    //The task that we want to update.
    const task = await prisma.task.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.log("ERROR UPDATING TASK: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}


