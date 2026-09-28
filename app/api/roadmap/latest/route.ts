import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
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

    const { data, error } = await supabase
      .from("roadmaps")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "No roadmap found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      roadmap: data.roadmap,
      roadmapId: data.id,
      progress: data.progress,
      completedItems: data.completed_items || [],
    });
  } catch (error) {
    console.error("LATEST ROADMAP ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load roadmap." },
      { status: 500 }
    );
  }
}