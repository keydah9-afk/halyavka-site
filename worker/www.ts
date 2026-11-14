// Worker halyavka-www: www.halyavka.net/* → 301 на тот же адрес на halyavka.net (с путём и параметрами).
// До переезда www отдавал копию сайта с Apache (дубль); после — один канонический домен.
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    url.hostname = 'halyavka.net';
    url.protocol = 'https:';
    return new Response(null, { status: 301, headers: { Location: url.toString() } });
  },
};
