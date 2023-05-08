import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  //   findById(id: string): Promise<User | null>
  //   findByEmail(email: string): Promise<User | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}
