import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { UpdateUserSchema, UserSchema } from "@/lib/schema";
import { compare, hash } from "bcrypt-ts";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "You are not connected" },
        { status: 400 },
      );
    }
    if (session?.user?.role != "Owner") {
      return NextResponse.json(
        { message: "You are not the Owner" },
        { status: 400 },
      );
    }
    const Api_data = await prisma.user.findMany({});
    if (!Api_data) {
      return NextResponse.json({ message: "No user found" }, { status: 400 });
    }
    return NextResponse.json({ message: Api_data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed fetch the users" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = await UpdateUserSchema.safeParseAsync(data);
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

    const dataToUpdate = await Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) =>
          value !== undefined &&
          value !== "" &&
          key !== "uuid" &&
          key !== "password",
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

    const passData = await prisma.user.findUnique({
      where: {
        uuid: data.uuid,
      },
      select: {
        password: true,
      },
    });

    if (!passData) {
      return NextResponse.json(
        { message: "This account could not be found." },
        { status: 400 },
      );
    }
    const isMatched = await compare(data.password, passData.password);

    if (!isMatched) {
      return NextResponse.json(
        { message: "Password does not match" },
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

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { message: "You are not connected" },
        { status: 400 },
      );
    }
    if (session?.user?.role != "Owner") {
      return NextResponse.json(
        { message: "You are not the Owner" },
        { status: 400 },
      );
    }
    const uuidExist = await prisma.user.findUnique({
      where: {
        uuid: data,
      },
    });
    if (!uuidExist) {
      return NextResponse.json(
        { message: "There is no user with this uuid" },
        { status: 400 },
      );
    }
    if (uuidExist.role == "Owner") {
      return NextResponse.json(
        { message: "The user have the user Owner." },
        { status: 400 },
      );
    }
    const isYou = await prisma.user.findUnique({
      where: {
        uuid: data,
      },
    });
    if (isYou?.uuid == session?.user?.uuid) {
      return NextResponse.json(
        { message: "You can't delete your account" },
        { status: 400 },
      );
    }
    const data_api = await prisma.user.delete({
      where: {
        uuid: data,
      },
    });
    if (!data_api) {
      return NextResponse.json(
        { message: "The user could not be delete." },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: "User delete successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed fetch the user" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = await UserSchema.safeParseAsync(data);
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

    const Data_Exist = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (Data_Exist) {
      return NextResponse.json(
        { message: "The email address already exists in the database." },
        { status: 400 },
      );
    }

    if (session?.user?.role != "Owner") {
      return NextResponse.json(
        { message: "You are not the Owner" },
        { status: 400 },
      );
    }

    const hashedPass = await hash(data.password, 15);

    const User_Data = await prisma.user.create({
      data: {
        firstName: data.firstName,
        name: data.name,
        email: data.email,
        role: data.role,
        image: "",
        password: hashedPass,
      },
    });

    if (!User_Data) {
      return NextResponse.json(
        { message: "The user could not be created." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Failed fetch the user" },
      { status: 500 },
    );
  }
}
