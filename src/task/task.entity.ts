import { Entity, Column, ObjectIdColumn } from 'typeorm'

@Entity()
export class Task {
    @ObjectIdColumn()
    _id: string

    @Column()
    name: string

    @Column()
    deadline: string
}