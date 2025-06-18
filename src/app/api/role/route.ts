
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"
import { RoleSchema } from "@/schema";

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
        const role = await prisma.role.findMany({
            select: {
                uuid: true,
                color: true,
                name: true,
                permission: true,
            }
        });
        if (!role) {
            return NextResponse.json(
                { message: "No role found" },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: role },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: "Failed fetch the roles" },
            { status: 500 }
        );
    };
}
export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const validatedData = await RoleSchema.safeParseAsync(data);
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

        const PermissionExist = await prisma.permission.findMany({
            where: {
                name: `${data.permission}`,
            },
        });
        if (!PermissionExist) {
            return NextResponse.json(
                { message: "Permission does`t not exist" },
                { status: 400 }
            );
        }
        if (session?.user?.role != "Owner") {
            return NextResponse.json(
                { message: "You are not the Owner" },
                { status: 400 }
            )
        };
        const nameExist = await prisma.role.findUnique({
            where: {
                name: data.name
            }
        })
        if (nameExist) {
            return NextResponse.json(
                { message: "Role name already exists in the database" },
                { status: 400 }
            )
        };
        const role = await prisma.role.create({
            data: {
                name: data.name,
                color: data.color,
                permission: data.permission
            }
        });
        if (!role) {
            return NextResponse.json(
                { message: "The role could not be created." },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: "Permission created successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: "Failed fetch the role" },
            { status: 500 }
        );
    };
}
export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json()
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
        const uuidExist = await prisma.role.findUnique({
            where: {
                uuid: data
            }
        })
        if (!uuidExist) {
            return NextResponse.json(
                { message: "There is no role with this uuid" },
                { status: 400 }
            )
        };
        if (uuidExist.name == "Owner" || "User") {
             return NextResponse.json(
                { message: "You cannot delete a essential role" },
                { status: 400 }
            )
        }
        const api_data = await prisma.role.delete({
            where: {
                uuid: data
            }
        });
        if (!api_data) {
            return NextResponse.json(
                { message: "The role could not be delete." },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: "Role delete successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: "Failed fetch the role" },
            { status: 500 }
        );
    };
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json()
        const validatedData = await RoleSchema.safeParseAsync(data);
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
        const uuidExist = await prisma.role.findUnique({
            where: {
                uuid: data.uuid
            }
        })
        if (!uuidExist) {
            return NextResponse.json(
                { message: "There is no role with this uuid" },
                { status: 400 }
            )
        };
        const role = await prisma.role.update({
            where: {
                uuid: data.uuid
            },
            data: {
                name: data.name,
                color: data.color,
                permission: data.permission,
            }
        });
        if (!role) {
            return NextResponse.json(
                { message: "The role could not be updated." },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: "Role updated successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: "Failed fetch the role" },
            { status: 500 }
        );
    };
}