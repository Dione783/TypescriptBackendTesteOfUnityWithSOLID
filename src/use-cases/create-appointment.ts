import { Appointment } from "../entities/Appointment";
import { AppointmentRepositorie } from "../repositories/appointmentsRepositorie";

interface ICreateAppointmentRequest{
    costumer:string,
    startsAt:Date,
    endsAt:Date,
}

type ICreateAppointmentResponse = Appointment;

export class CreateAppointment{
    constructor(private appointmentRepository:AppointmentRepositorie){
        
    }

    async execute ({costumer,startsAt,endsAt}:ICreateAppointmentRequest): Promise<ICreateAppointmentResponse> {
        const overlaping = await this.appointmentRepository.findOverlapingAppointment(startsAt,endsAt);

        if(overlaping){
            throw new Error("Another appointment overlaping this appointment");
        }

        const appointment = new Appointment({costumer,startsAt,endsAt});
        await this.appointmentRepository.create(appointment)
        return appointment;
    }
}