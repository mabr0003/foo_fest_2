const url = process.env.NEXT_PUBLIC_API_URL;
const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headersList = {
  "Content-Type": "application/json",
  apikey: supaKey,
  Prefer: "return=representation",
};

export async function getBands() {
  const response = await fetch(url + "/bands", {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getSchedule() {
  const response = await fetch(url + "/schedule", {
    method: "GET",
  });

  const data = await response.json();
  return data;
}

export async function getSingleBand(slug) {
  const response = await fetch(url + "/bands/" + slug, {
    method: "GET",
  });

  const data = await response.json();
  return data;
}
export async function getAvailableSpots() {
  const response = await fetch(url + "/available-spots", {
    method: "GET",
  });

  const data = await response.json();
  return data;
}
export async function reserveSpots(area, amount) {
  const response = await fetch(url + "/reserve-spot", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      area: area,
      amount: amount,
    },
  });

  const data = await response.json();
  return data;
}
export async function postGuests(subdata) {
  const response = await fetch(supaUrl + "/guests", {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(subdata),
  });

  const data = await response.json();
  return data;
}

export async function sendData(guestInfo, reservationId) {
  const data = guestInfo.map((guest) => ({
    firstname: guest.firstname,
    lastname: guest.lastname,
    email: guest.email,
    reservationid: reservationId,
  }));

  await postGuests(data);
}

export async function reserveSpot(area, amount) {
  const response = await fetch(url + "/reserve-spot", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area: area,
      amount: amount,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to reserve spot");
  }

  const data = await response.json();
  return data;
}
export async function fullfillReservation(id) {
  const response = await fetch(url + "/fullfill-reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  const data = await response.json();
  return data;
}
