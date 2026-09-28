import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { roadmapId, progress, completedItems } =
      await request.json();

    if (
      !roadmapId ||
      typeof progress !== "number" ||
      !Array.isArray(completedItems)
    ) {
      return NextResponse.json(
        { error: "Invalid progress data." },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("roadmaps")
      .update({
        progress,
        completed_items: completedItems,
      })
      .eq("id", roadmapId)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      progress,
      completedItems,
    });
  } catch (error) {
    console.error("ROADMAP PROGRESS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update progress." },
      { status: 500 }
    );
  }
}