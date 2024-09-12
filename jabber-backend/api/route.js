import express from "express"
import jabberDAO from "../dao/jabberDAO.js"
import msgDAO from "../dao/msgDAO.js"
import contactDAO from "../dao/contactDAO.js"
const router = express.Router()

router.route("/chat").get(async (req,res)=>{
    try{
        let list =await jabberDAO.getchatDAO()
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e)
    {
        res.status(500).json({error: e})
    }
}).post(async (req,res)=>{
      try{
        const roomName = req.body.roomName
        const creatorName = req.body.creatorName
        const creatorEmail = req.body.creatorEmail
        const profileImage = req.body.profileImage
        const theme = req.body.theme
        const timestamp = req.body.timestamp   
        let todoresponse = await jabberDAO.addchatDAO(
            roomName,
            creatorName,
            creatorEmail,
            profileImage,
            theme,
            timestamp
        )
        res.json({todoresponse})
      }catch(e)
      {
        res.status(500).send("failed post")
      }
})

router.route("/chat/:id").put(async (req,res)=>{
    try{
        const id = req.params.id
        const roomName = req.body.roomName
        const creatorName = req.body.creatorName
        const creatorEmail = req.body.creatorEmail
        const profileImage = req.body.profileImage
        const theme = req.body.theme
        const timestamp = req.body.timestamp   
        const todoResponse = await jabberDAO.updateChatDAO(
            id,
            roomName,
            creatorName,
            creatorEmail,
            profileImage,
            theme,
            timestamp
        )
        
        var {error} = todoResponse
        if(error)
        {
            res.status(400).json({ error })
        }
        if (todoResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update ToDo List",
            )
          }
    
          res.json({ status: "success" })
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }

}).delete(async (req,res)=>{
    try{
        const id = req.params.id;
        const todoResponse =await jabberDAO.deleteChatDAO(id)
        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}).get(async (req,res)=>{
    try{
        const id = req.params.id
        let list =await jabberDAO.getIdchatDAO(id)
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e)
    {
        res.status(500).json({error: e})
    }
})

router.route("/chat/:id/messages").get(async (req,res)=>{
    try{
        const id = req.params.id;
        const msgResponse = await msgDAO.getMsgDAO(id);
        if(!msgResponse)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(msgResponse)

    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
}).post(async(req,res)=>{
    try{
        const id = req.params.id;
        const message = req.body.message;
        const imgUrl = req.body.imgUrl;
        const userName = req.body.userName;
        const timestamp = req.body.timestamp; 
        const msgpostResponse = await msgDAO.addMsgDAO(
            message,
            imgUrl,
            userName,
            id,
            timestamp
        )
        
        res.json({msgpostResponse})
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
})

router.route("/chat/:id/messages/:msgId").put(async (req,res)=>{
    try{
        const id = req.params.id;
        const msgId = req.params.msgId;
        const message = req.body.message;
        const imgUrl = req.body.imgUrl;
        const userName = req.body.userName;
        const timestamp = req.body.timestamp;
        const msgputResponse = await msgDAO.PutMsgDAO(
            id,
            msgId,
            message,
            imgUrl,
            userName,
            timestamp
        )
        var {error} = msgputResponse
        if(error)
        {
            res.status(400).json({ error })
        }
        if (msgputResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update Message",
            )
          }
    
          res.json({ status: "success" })
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
}).delete(async (req,res)=>{
    try{
        const id = req.params.id;
        const msgId = req.params.msgId;
        const msgdeleteResponse = await msgDAO.deleteMsgDAO(msgId);
        res.json({ status: "success" })
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
}).get(async (req,res)=>{
    try{
        const id = req.params.id
        const msgId = req.params.msgId;
        let list =await msgDAO.getIdMsgDAO(id,msgId)
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e)
    {
        res.status(500).json({error: e})
    }
})


router.route("/contact").get(async (req,res)=>{
    try{
        let list =await contactDAO.getcontactDAO()
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e)
    {
        res.status(500).json({error: e})
    }
}).post(async (req,res)=>{
      try{
        const name = req.body.name
        const email = req.body.email
        const message = req.body.message
        let todoresponse = await contactDAO.addcontactDAO(
            name,
            email,
            message,
        )
        res.json({todoresponse})
      }catch(e)
      {
        res.status(500).send("failed post")
      }
})

router.route("/contact/:id").put(async (req,res)=>{
    try{
        const id = req.params.id
        const name = req.body.name
        const email = req.body.email
        const message = req.body.message   
        const todoResponse = await contactDAO.updatecontactDAO(
            id,
            name,
            email,
            message,
        )
        var {error} = todoResponse
        if(error)
        {
            res.status(400).json({ error })
        }
        if (todoResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update ToDo List",
            )
          }
    
          res.json({ status: "success" })
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }

}).delete(async (req,res)=>{
    try{
        const id = req.params.id;
        const todoResponse =await contactDAO.deletecontactDAO(id)
        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}).get(async (req,res)=>{
    try{
        const id = req.params.id
        let list =await contactDAO.getIdcontactDAO(id)
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e)
    {
        res.status(500).json({error: e})
    }
})


export default router

