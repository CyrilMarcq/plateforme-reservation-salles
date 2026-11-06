const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;
const ROOT = __dirname;

function readData(filename) {
  const file = path.join(ROOT, "data", filename);
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data, null, 2));
}

function serveHome(res) {
  const file = path.join(ROOT, "public", "index.html");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(fs.readFileSync(file));
}

const server = http.createServer(function(req, res) {
  const url = new URL(req.url, "http://localhost");

  if (req.method === "GET" && url.pathname === "/") {
    return serveHome(res);
  }

  if (req.method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, { status: "ok" });
  }

  if (req.method === "GET" && url.pathname === "/api/rooms") {
    return sendJson(res, 200, readData("rooms.json"));
  }

  if (req.method === "GET" && url.pathname === "/api/reservations") {
    return sendJson(res, 200, readData("reservations.json"));
  }

  if (url.pathname.startsWith("/api/reservations")) {
    return sendJson(res, 501, {
      error: "Fonctionnalite non implementee",
      message: "La gestion des reservations reste a developper."
    });
  }

  return sendJson(res, 404, { error: "Route inconnue" });
});

server.listen(PORT, function() {
  console.log("Application disponible sur http://localhost:" + PORT);
});
