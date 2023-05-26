import { TODOLIST_SCHEMA} from './name'

export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    pimaryKey: "id",
    properties: {
        id: {type: 'string'},
        content: {type: 'string'},
        created_on: {type: 'string'},
        status: {type: 'int'}
    }
}