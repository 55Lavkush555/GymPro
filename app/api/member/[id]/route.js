import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";
import { NextResponse } from "next/server";

// ✅ GET single member
export async function GET(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const member = await Member.findById(id);

    if (!member) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(member);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// ✏️ UPDATE member
export async function PUT(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;

    const body = await req.json();

    const updatedMember = await Member.findByIdAndUpdate(
      id,
      body,
      {
        new: true,        // updated data return karega
        runValidators: true, // schema validation bhi chalega
      }
    );

    if (!updatedMember) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedMember);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

// ❌ DELETE member
export async function DELETE(req, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Member deleted successfully ✅",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}