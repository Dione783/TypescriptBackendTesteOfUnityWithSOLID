import { t } from "vitest/dist/global-e98f203b";

interface IAppointmentProps{
    costumer:string,
    startsAt:Date,
    endsAt:Date,
}

export class Appointment{
    private props: IAppointmentProps;

    get customer(){
        return this.props.costumer;
    }

    get startsAt(){
        return this.props.startsAt;
    }

    get endsAt(){
        return this.props.endsAt;
    }

    constructor(props:IAppointmentProps){ 
        const { startsAt,endsAt } = props;
        
        if(endsAt <= startsAt){
            throw new Error("End Date cannot be before start Date");
        }
        if(startsAt <= new Date()){
            throw new Error("start Date before now");
        }
        this.props=props;
    }
}