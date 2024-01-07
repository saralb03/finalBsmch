const MessagesModel = require("../models/messageModel");

// const getMessages = async (req, res,next) => {
const getMessages = async (req, res) => {
    try {
        const { from, to } = req.body;

        const messages = await MessagesModel.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    // } catch (ex) {
    //     next(ex);
    // }
    }catch (ex) {
        console.log(ex);
        res.status(500).json({ msg: "Error getting message ID", ex });
      }
};
// const addMessage = async (req, res, next) => {
const addMessage = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        const { from, to, message } = req.body;
        const data = await MessagesModel.create({
            message: message,
            users: [from, to],
            sender: from,
        });

        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    // } catch (ex) {
    //     next(ex);
    // }
    }catch (ex) {
        console.log(ex);
        res.status(500).json({ msg: "Error adding message ", ex });
      }
};
module.exports = { getMessages, addMessage };