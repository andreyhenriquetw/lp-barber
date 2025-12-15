"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export const createBooking = async ({
  serviceId,
  date,
}: CreateBookingParams) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado")
  }

  await db.booking.create({
    data: {
      userId: session.user.id,
      serviceId,
      date,
    },
  })

  revalidatePath("/barbershops/[id]")
  revalidatePath("/bookings")
}
