import { describe, expect, it, test } from "vitest";
import { Appointment } from "../entities/Appointment";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointments-repositorie";
import { getFutureDate } from "../tests/utils/GetFutureDate";
import { CreateAppointment } from "./create-appointment";

describe("Create Appointment",()=>{
    it("should be able to create an Appointment",()=>{
        const appointmentRepository = new InMemoryAppointmentRepository();

        const createAppointment = new CreateAppointment(appointmentRepository);
        const startsAt = getFutureDate("2022-08-10");
        const endsAt = getFutureDate("2022-08-11");

        expect(createAppointment.execute({
            costumer:"John Doe",
            startsAt,
            endsAt,
        })).resolves.toBeInstanceOf(Appointment);
    });

    it("not should be able to create an Appointment with overlaping appointment",async ()=>{
        const appointmentRepository = new InMemoryAppointmentRepository();

        const createAppointment = new CreateAppointment(appointmentRepository);
        const startsAt = getFutureDate("2022-08-10");
        const endsAt = getFutureDate("2022-08-15");

        await createAppointment.execute({
            costumer:"John Doe",
            startsAt,
            endsAt,
        })

        expect(createAppointment.execute({
            costumer:"John Doe",
            startsAt:getFutureDate("2022-08-14"),
            endsAt:getFutureDate("2022-08-18"),
        })).rejects.toBeInstanceOf(Error)



        expect(createAppointment.execute({
            costumer:"John Doe",
            startsAt:getFutureDate("2022-08-08"),
            endsAt:getFutureDate("2022-08-12"),
        })).rejects.toBeInstanceOf(Error)



        expect(createAppointment.execute({
            costumer:"John Doe",
            startsAt:getFutureDate("2022-08-08"),
            endsAt:getFutureDate("2022-08-17"),
        })).rejects.toBeInstanceOf(Error)


        expect(createAppointment.execute({
            costumer:"John Doe",
            startsAt:getFutureDate("2022-08-11"),
            endsAt:getFutureDate("2022-08-12"),
        })).rejects.toBeInstanceOf(Error)
    });    
})