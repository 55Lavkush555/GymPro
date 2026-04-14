import { connectDB } from "@/lib/mongodb";
import Member from "@/models/Member";

export async function GET() {
  try {
    await connectDB();

    const members = await Member.find();

    return Response.json(members || []);
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const member = await Member.create(body);

    return Response.json(member);
  } catch (err) {
    return Response.json(
      { error: err.message },
      { status: 500 }
    );
  }
}