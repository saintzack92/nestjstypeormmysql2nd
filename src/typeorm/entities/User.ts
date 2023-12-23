import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4} from 'uuid'
 
@Entity({name: 'users'})
export class User {
    @PrimaryColumn('uuid')
    id:string;

    @Column({unique:true})
    username:string;

    @Column({
        nullable:false,
        default:''
    })
    password:string;

    @Column({type: 'timestamp', default:()=>'CURRENT_TIMESTAMP' })
    createdAt:Date;

    @Column({nullable:true})
    authStrategy: string

    constructor(){
        this.id = uuidv4();
        this.createdAt =new Date()
    }
}