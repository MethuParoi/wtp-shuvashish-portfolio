//First time add blog and projects to the database
import { databases } from "./appwrite";
import { ID } from "appwrite";

const db = {};

const collections = [
    {
        dbId: process.env.NEXT_PUBLIC_DATABASE_ID,
        id: process.env.NEXT_PUBLIC_COLLECTION_ID_PROJECTS,
        name: "projects",
    },
    {
        dbId: process.env.NEXT_PUBLIC_DATABASE_ID,
        id: process.env.NEXT_PUBLIC_COLLECTION_ID_BLOGS,
        name: "blogs",
    },
];

collections.forEach((col) => {
    db[col.name] = {
        create: (payload, permissions = [], id = ID.unique()) => {
            if (!col.dbId || !col.id) {
                throw new Error('Database or Collection ID is not configured.');
            }
            
            return databases.createDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            );
        },
        update: (id, payload, permissions = []) => {
            return databases.updateDocument(
                col.dbId,
                col.id,
                id,
                payload,
                permissions
            );
        },
        delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
        list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
        get: (id) => databases.getDocument(col.dbId, col.id, id),
    };
});

export default db;


