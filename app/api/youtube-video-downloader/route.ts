import ytdl from '@distube/ytdl-core';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || !ytdl.validateURL(url)) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // Get video info
    const info = await ytdl.getInfo(url);
    
    // Choose the highest quality format that has both audio and video
    const format = ytdl.chooseFormat(info.formats, { filter: 'audioandvideo', quality: 'highest' });
    
    if (!format || !format.url) {
        return NextResponse.json({ error: 'No suitable video format found' }, { status: 404 });
    }

    return NextResponse.json({
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1]?.url,
        downloadUrl: format.url,
        duration: info.videoDetails.lengthSeconds,
    });

  } catch (error: any) {
    console.error('ytdl error:', error);
    return NextResponse.json({ error: 'Failed to extract video: ' + error.message }, { status: 500 });
  }
}
