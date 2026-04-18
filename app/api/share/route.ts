import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { tool_slug, payload_content } = await req.json();

    if (!tool_slug || !payload_content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (payload_content.length > 500000) { // Limit to ~500kb
      return NextResponse.json({ error: "Payload too large. Max 500KB." }, { status: 413 });
    }

    // Since we're using Anon key, ensure your Supabase RLS allows INSERTS.
    const { data, error } = await supabase
      .from("shared_snippets")
      .insert([{ tool_slug, payload_content }])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase snippet insert error:", error);
      return NextResponse.json({ error: "Failed to save snippet" }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 200 });

  } catch (error: any) {
    console.error("Share endpoint error:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
