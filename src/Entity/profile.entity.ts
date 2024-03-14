import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IsEnum, IsInt, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {join} from "path";
import {POST_IMAGE_PATH} from "../common/const/path.const";
import {User} from "./auth.entity";


export enum ImageModelType{
    POST_IMAGE,
}
@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: 0
    })
    @IsInt()
    @IsOptional()
    order: number

    @Column({
        enum: ImageModelType
    })
    @IsEnum(ImageModelType)
    @IsString()
    type: ImageModelType

    @Column()
    @IsString()
    @Transform(({value,obj})=>{
        if(obj.value === ImageModelType.POST_IMAGE){
            return join(
                POST_IMAGE_PATH,
                value
            )
        }else{
            return value
        }
    })
    path: string

    @ManyToOne((type)=> User, (post)=> post.profiles)
    post?: User
}