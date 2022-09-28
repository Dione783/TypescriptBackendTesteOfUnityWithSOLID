import { Appointment } from "../entities/Appointment";

export interface AppointmentRepositorie{
    create(appointment:Appointment) : Promise<void>
    findOverlapingAppointment(startsAt:Date,endsAt:Date): Promise<Appointment | null>
}
