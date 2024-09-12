import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;
let msg;

export default class msgDAO{
    static async injectDB(conn)
    {
        if(msg)
        {
            return
        }
        try{
            msg = await conn.db("Jabber").collection("Messages")
        }catch(e)
        {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addMsgDAO( message,imgUrl,userName,id,timestamp)
    {
        try{
           const msgDoc = {
            message : message,
            imgUrl : imgUrl,
            userName:userName,
            id : new ObjectId(id),
            timestamp : timestamp
           } 
           const addMsgg = await msg.insertOne(msgDoc)
           return addMsgg
        }
        catch(e)
        {
            console.error(`Unable to post activity: ${e}`);
            return {error:e}
        }
    }

    static async getMsgDAO(id)
    {
        try{
            const getMsg = await msg.find({id:new ObjectId(id)}).toArray()
            return getMsg
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async PutMsgDAO(id,msgId,message,imgUrl,userName,timestamp)
    {
        try{
            const putMsg = await msg.updateOne(
                {_id: new ObjectId(msgId)},
                {
                    $set :{
                        message : message,
                        imgUrl : imgUrl,
                        userName:userName,
                        id : new ObjectId(id),
                        timestamp : timestamp
                    }
                }
            )
            return putMsg

        }catch(e)
        {
            console.error(`Unable to Update Activities: ${e}`)
            return {error:e}
        }
    }

    static async deleteMsgDAO(msgId)
    {
        try{
            const deleteMsg = await msg.deleteOne({
                _id : new ObjectId(msgId)
            })
            return deleteMsg

        }catch(e)
        {
            console.error(`Unable to Delete Activities: ${e}`)
            return {error:e}
        }
    }

    static async getIdMsgDAO(id,msgId)
    {
        try{
            const getMsg = await msg.find({_id:new ObjectId(msgId)}).toArray()
            return getMsg
        }catch(e)
        {
            console.error(`Unable to Get Message: ${e}`)
            return {error:e}
        }
    }
}