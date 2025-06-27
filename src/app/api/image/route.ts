import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { message: "You are not connected" },
        { status: 400 },
      );
    }

    const file = data.get(`image`) as Blob | null;
    if (!file) {
      return NextResponse.json({ message: "Fille Error" }, { status: 400 });
    }

    const buffer = Buffer.from(await (file as File).arrayBuffer());
    const destination = path.join(process.cwd(), "public", "image");
    await mkdir(destination, { recursive: true });
    const originalImageName = (file as File).name;
    const ext = path.extname(originalImageName);
    const filename = session.user.email + ext;
    const filepath = path.join(destination, filename);

    await writeFile(filepath, buffer);

    const upload = await prisma.user.update({
      where: {
        uuid: session.user.uuid,
      },
      data: {
        image: process.env.NEXT_PUBLIC_DOMAIN + "image/" + filename,
      },
    });

    if (!upload) {
      return NextResponse.json(
        { message: "Could not load image into DataBased" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "The image was uploaded successfully" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "The image cannot by upload" },
      { status: 500 },
    );
  }
}
