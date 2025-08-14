import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async () => {
    const SUBDOMAIN = "https://secure.copelcolchoes.com.br";
    const QUERY =
      "?_fields=antedimento%2Cbairro%2Ccidade%2Ccomplemento%2Cestado%2Clatitude%2Clongitude%2Cnome%2Crua%2Ctelefone%2Cid%2Cnumero&_sort=cidade%20ASC";

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
      const response = await fetch(
        SUBDOMAIN + "/api/dataentities/LJ/search/" + QUERY,
        {
          headers: {
            "rest-range": "resources=0-100",
          },
          signal: controller.signal,
        },
      );
      const res = await response.text();
      const headers = new Headers(response.headers);
      headers.set("access-control-allow-origin", "*");

      return new Response(res, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (_err) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*",
        },
      });
    } finally {
      clearTimeout(timeoutId);
    }
  },
};
