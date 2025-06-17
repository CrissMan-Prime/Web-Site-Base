
import { NextRequest, NextResponse } from "next/server";
import { RegisterSchema } from "@/schema";
import { hash } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth"

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const validatedData = await RegisterSchema.safeParse(data);
        const session = await auth()
        const res = await fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt")
        const domain = await res.text()
        const email = data.email.split('@')[1]
        const domain_email = email.split('.')[0]

        if (!domain) {
            return NextResponse.json(
                { message: "Invalid Data from iana" },
                { status: 400 }
            )
        };

        const domainCompare = domain.split(`\n`)
        .map(tld => tld.toLowerCase())
        .filter(line => !line.startsWith(`#`) && line.trim() !== '');

        if (!domainCompare) {
            return NextResponse.json(
                { message: "Invalid Data from Iana" },
                { status: 400 }
            )
        };
        if (!domainCompare.includes(domain_email)) {
            return NextResponse.json(
                { message: "The domain is not valid." },
                { status: 400 }
            )
        };
        const userExists = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (!validatedData) {
            return NextResponse.json(
                { message: "Invalid Data" },
                { status: 400 }
            )
        };
        if (session) {
            return NextResponse.json(
                { message: "You are already connected" },
                { status: 400 }
            )
        };

        if (userExists) {
            return NextResponse.json(
                { message: "There is already an account with this email address." },
                { status: 400 }
            )
        };

        const hashedPass = await hash(data.password, 15)
        const role = "User"

        if (role != "User") {
            return NextResponse.json(
                { message: "Something went wrong" },
                { status: 400 }
            )
        };
        const RoleExist = await prisma.role.findUnique({
            where: {
                name: role
            }
        });
        if (!RoleExist) {
            const RoleCreate = await prisma.role.create({
                data: {
                    name: role,
                }
            });
            if (!RoleCreate) {
                return NextResponse.json(
                    { message: "The role not created" },
                    { status: 400 }
                )
            };
        };

        const user = await prisma.user.create({
            data: {
                firstName: data.firstName,
                name: data.name,
                email: data.email,
                role: role,
                password: hashedPass,
            }
        });

        if (!user) {
            return NextResponse.json(
                { message: "The account could not created in the database." },
                { status: 400 }
            )
        };
        return NextResponse.json(
            { message: "The user is created" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { message: "Failed to create a user" },
            { status: 500 }
        );
    };
}