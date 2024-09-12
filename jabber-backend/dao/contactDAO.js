import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let contact

export default class jabberDAO{
    static async injectDB(conn)
    {
        if(contact)
        {
            return
        }
        try{
            contact = await conn.db("Jabber").collection("contact")
        }catch(e)
        {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addcontactDAO(name,email,message)
    {
        try{
            const contactDoc = {
                name :name,
                email : email,
                message : message
            }
            const addChatt = await contact.insertOne(contactDoc)
            return addChatt
        }catch(e)
        {
            console.error(`Unable to post activity: ${e}`);
            return {error:e}
        }
    }

    static async getcontactDAO()
    {
        try{
         const getcontact = await contact.find({}).toArray()
         return getcontact
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async getIdcontactDAO(id)
    {
        try{
         const getcontact = await contact.find({_id:new ObjectId(id)}).toArray()
         return getcontact
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async updatecontactDAO(id,name,email,message)
    {
        try{
            const updateJabber =await contact.updateOne(
                {_id: new ObjectId(id)},
                {$set : {
                    name :name,
                    email : email,
                    message : message,
                }}
            )
            return updateJabber
        }catch(e)
        {
            console.error(`Unable to Update Activities: ${e}`)
            return {error:e}
        }
    }

    static async deletecontactDAO(id)
    {
        try{
            const deleteJabber = await contact.deleteOne({
                _id: new ObjectId(id),
            })
            return deleteJabber
        }catch(e)
        {
            console.error(`Unable to Delete Activities: ${e}`)
            return {error:e}
        }
    }
}