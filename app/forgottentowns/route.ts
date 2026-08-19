import { FORGOTTEN_TOWNS_HTML } from "./content";

export async function GET() {
  return new Response(FORGOTTEN_TOWNS_HTML, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
