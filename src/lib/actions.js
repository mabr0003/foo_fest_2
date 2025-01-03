import { postGuests } from "@/lib/api";

export async function sendData(guestInfo, reservationId) {
  const data = guestInfo.map((guest) => ({
    firstname: guest.firstname,
    lastname: guest.lastname,
    email: guest.email,
    reservationid: reservationId,
  }));

  await postGuests(data);
}
