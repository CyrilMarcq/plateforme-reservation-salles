async function loadRooms() {
  const response = await fetch("/api/rooms");
  const rooms = await response.json();
  const container = document.getElementById("rooms");
  container.innerHTML = "";
  rooms.forEach(function(room) {
    const card = document.createElement("article");
    card.className = "room";
    const title = document.createElement("h3");
    title.textContent = room.name;
    const capacity = document.createElement("p");
    capacity.textContent = "Capacite : " + room.capacity + " personnes";
    const location = document.createElement("p");
    location.textContent = room.location;
    const description = document.createElement("p");
    description.textContent = room.description;
    card.append(title, capacity, location, description);
    container.appendChild(card);
  });
}

async function loadReservations() {
  const response = await fetch("/api/reservations");
  const reservations = await response.json();
  const container = document.getElementById("reservations");
  container.innerHTML = "";
  reservations.forEach(function(reservation) {
    const item = document.createElement("article");
    item.className = "reservation";
    item.textContent = reservation.title + " - " + reservation.date
      + " de " + reservation.start + " a " + reservation.end;
    container.appendChild(item);
  });
}

loadRooms().catch(function(error) {
  console.error(error);
});

loadReservations().catch(function(error) {
  console.error(error);
});
