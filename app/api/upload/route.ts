import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const allowedImages = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const allowedVideos = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"];
    const isImage = allowedImages.includes(file.type);
    const isVideo = allowedVideos.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json({ error: "Formato no permitido. Usa JPG/PNG/WEBP/GIF (imagen) o MP4/WEBM/OGG/MOV (video)" }, { status: 400 });
    }

    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxVideoSize = 100 * 1024 * 1024; // 100MB
    const maxSize = isVideo ? maxVideoSize : maxImageSize;
    if (file.size > maxSize) {
      const limitMb = isVideo ? 100 : 5;
      return NextResponse.json({ error: `Máximo ${limitMb}MB por archivo` }, { status: 400 });
    }

    const ext = file.type.split("/")[1] ?? (isVideo ? "mp4" : "jpg");
    const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const subdir = isVideo ? "videos" : "images";
    const path = `${subdir}/${unique}`;
    const bytes = await file.arrayBuffer();

    const { error: upError } = await supabase.storage
      .from("media")
      .upload(path, bytes, {
        contentType: file.type,
        upsert: false,
      });

    if (upError) {
      console.error("Supabase upload error:", upError);
      return NextResponse.json({ error: "Error subiendo archivo a almacenamiento" }, { status: 500 });
    }

    const { data: publicUrl } = supabase.storage.from("media").getPublicUrl(path);
    return NextResponse.json({ url: publicUrl.publicUrl, type: isVideo ? "video" : "image" });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json({ error: "Error subiendo archivo" }, { status: 500 });
  }
}
