import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PermissionSchema } from "@/lib/schema";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const dataFromDB = await prisma.site_Settings.findMany({});
    if (!dataFromDB) {
      return NextResponse.json({ message: "No user found" }, { status: 400 });
    }
    return NextResponse.json({ message: dataFromDB }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Failed fetch the users" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const validatedData = await PermissionSchema.safeParseAsync(data);
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

    const dataFromDatabase = await prisma.site_Settings.findUnique({
      where: {
        identify: "Site_Setting",
      },
    });

    if (!dataFromDatabase) {
      const createSite = await prisma.site_Settings.create({
        data: {
          name: "The Arch Project",
          color: "#b6e619ff",
          description: "This website is made by CrissMan",
          theme: "system",
        },
      });

      if (!createSite) {
        return NextResponse.json(
          { message: "Cannot create site setting" },
          { status: 400 },
        );
      }
    }

    const upload = await prisma.site_Settings.update({
      where: {
        identify: "Site_Setting",
      },
      data: dataToUpdate,
    });

    if (!upload) {
      return NextResponse.json(
        { message: "Could not load image into DataBased" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "The site settings have been updated successfully." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "The image cannot by upload" },
      { status: 500 },
    );
  }
}
