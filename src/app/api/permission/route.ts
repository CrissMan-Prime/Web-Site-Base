
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"
import { PermissionSchema } from "@/schema";

export async function GET() {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { message: "You are not connected" },
                { status: 400 }
            )
        };
        if (session?.user?.role != "Owner") {
            return NextResponse.json(
                { message: "You are not the Owner" },
                { status: 400 }
            )
        };
        const permission = await prisma.permission.findMany({
            select: {
                uuid: true,
                name: true,
            }
        });
        if (!permission) {
            return NextResponse.json(
                { message: "No permissions found" },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: permission },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
             { message: "Failed fetch the permissions" },
            { status: 500 }
        );
    };
};
//TODO create a permission checker instead of role permission
export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const validatedData = await PermissionSchema.safeParseAsync(data);
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { message: "You are not connected" },
                { status: 400 }
            )
        };
          if (!validatedData) {
            return NextResponse.json(
                { message: "Invalid input data" },
                { status: 400 }
            );
        }
        if (session?.user?.role != "Owner") {
            return NextResponse.json(
                { message: "You are not the Owner" },
                { status: 400 }
            )
        };
        const nameExist = await prisma.permission.findUnique({
            where: {
                name: data.name
            }
        })
        if(nameExist) {
            return NextResponse.json(
                { message: "Permission name already exists in the database" },
                { status: 400 }
            )
        };
        const permission = await prisma.permission.create({
           data: {
            name: data.name
           }
        });
        if (!permission) {
            return NextResponse.json(
                { message: "The permission could not be created." },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: "Permission created successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
             { message: "Failed fetch the permissions" },
            { status: 500 }
        );
    };
}

export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json()
        const validatedData = await PermissionSchema.safeParseAsync(data);
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { message: "You are not connected" },
                { status: 400 }
            )
        };
          if (!validatedData) {
            return NextResponse.json(
                { message: "Invalid input data" },
                { status: 400 }
            );
        }
        if (session?.user?.role != "Owner") {
            return NextResponse.json(
                { message: "You are not the Owner" },
                { status: 400 }
            )
        };
        const uuidExist = await prisma.permission.findUnique({
            where: {
                uuid: data
            }
        })
        if(!uuidExist) {
            return NextResponse.json(
                { message: "There is no permission with this uuid" },
                { status: 400 }
            )
        };
        const permission = await prisma.permission.delete({
           where: {
            uuid: data
           }
        });
        if (!permission) {
            return NextResponse.json(
                { message: "The permission could not be delete." },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: "Permission delete successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
             { message: "Failed fetch the permissions" },
            { status: 500 }
        );
    };
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json()
        const validatedData = await PermissionSchema.safeParseAsync(data);
        const session = await auth()
        if (!session) {
            return NextResponse.json(
                { message: "You are not connected" },
                { status: 400 }
            )
        };
          if (!validatedData) {
            return NextResponse.json(
                { message: "Invalid input data" },
                { status: 400 }
            );
        }
        if (session?.user?.role != "Owner") {
            return NextResponse.json(
                { message: "You are not the Owner" },
                { status: 400 }
            )
        };
        const nameExist = await prisma.permission.findUnique({
            where: {
                uuid: data.uuid
            }
        })
        if(!nameExist) {
            return NextResponse.json(
                { message: "There is no permission with this uuid" },
                { status: 400 }
            )
        };
        const permission = await prisma.permission.update({
           where: {
            uuid: data.uuid
           },
           data: {
            name: data.name
           }
        });
        if (!permission) {
            return NextResponse.json(
                { message: "The permission could not be updated." },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: "Permission updated successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
             { message: "Failed fetch the permissions" },
            { status: 500 }
        );
    };
}