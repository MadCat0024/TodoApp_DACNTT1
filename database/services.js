import Realm from "realm";



import {databaseOptions} from './allSchema'
import { TodoListSchema } from "./tables";
import { TODOLIST_SCHEMA } from "./name";

export const getAll = (nameTable) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
            let alls = realm.objects(nameTable)
            resolve(alls)
        }
    ).catch(e => {
        reject(e)
    })
})

export const insert = (nameTable,obj) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.create(nameTable,obj,true)
            resolve(1)
        })
    }).catch(e => {
        reject(0)
    })
})

export const deleteTask = (nameTable,id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm)=>{
        realm.write(()=>{
            let deleteById = realm.objects(nameTable).filtered(`id = '${id}'`);
            realm.delete(deleteById);
            resolve(1);
        })
    }).catch( e=>{
        reject(0)
    })
})


export const deleteAllTask = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm)=>{
        realm.write(()=>{
            let deleteAll = realm.objects(TODOLIST_SCHEMA);
            realm.delete(deleteAll);
            resolve(1);
        })
    }).catch((e)=>{
        reject(0);
    })
})
// export const queryAllTodoList = ()=> new Promise((resolve, reject) => {
//     Realm.open(databaseOptions).then((realm) => {
//         let allTodoList = realm.objects(TodoListSchema);
//         resolve(allTodoList)
//         resolve(1);
//     }).catch(e=>{
//         reject(0)
//     })
// })

//update content
export const update = (nameTable, obj) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm)=>{
        realm.write(()=>{
            let deleteById = realm.objects(nameTable).filtered(`id = '${obj.id}'`)
            console.log(deleteById,'deleteById')
            if(deleteById[0]) {
                deleteById[0].content = obj.content
            }
            resolve(1);
        })
    }).catch( e=>{
        reject(0)
    })
})
