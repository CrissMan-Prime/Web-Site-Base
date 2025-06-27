import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminUpdateUserSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = await AdminUpdateUserSchema.safeParseAsync(data);
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "You are not connected" },
        { status: 400 },
      );
    }

    if (!validatedData) {
      return NextResponse.json(
        { message: "Invalid input data" },
        { status: 400 },
      );
    }

    if (session?.user?.role != "Owner") {
      return NextResponse.json(
        { message: "You are not the Owner" },
        { status: 400 },
      );
    }

    const dataToUpdate = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== undefined && value !== "" && key !== "uuid",
      ),
    );

    if (Object.keys(dataToUpdate).length == 0) {
      return NextResponse.json({ message: "No data input" }, { status: 400 });
    }

    const uuidExist = await prisma.user.findUnique({
      where: {
        uuid: data.uuid,
      },
    });

    if (!uuidExist) {
      return NextResponse.json(
        { message: "There is no user with this uuid" },
        { status: 400 },
      );
    }

    const Data_api = await prisma.user.update({
      where: {
        uuid: data.uuid,
      },
      data: dataToUpdate,
    });

    if (!Data_api) {
      return NextResponse.json(
        { message: "The user could not be updated." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed fetch the user" },
      { status: 500 },
    );
  }
}
