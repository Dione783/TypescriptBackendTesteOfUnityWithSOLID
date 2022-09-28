import { areIntervalsOverlapping} from 'date-fns'

import { Appointment } from "../../entities/Appointment";
import { AppointmentRepositorie } from "../appointmentsRepositorie";

export class InMemoryAppointmentRepository implements AppointmentRepositorie{
    public items:Appointment[] = []

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
    }

    async findOverlapingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overlapingAppointment = this.items.find(appointment => areIntervalsOverlapping(
            {start:startsAt,end:endsAt},
            {start:appointment.startsAt,end:appointment.endsAt},
            {inclusive:true}
        ));
        if(!overlapingAppointment){
            return null;
        }

        return overlapingAppointment;
    }
}