const express = require('express');
const router = express.Router();
const Player = require('../models/players');

//get all players
router.get('/',async(req,res) =>{
    try{
        const players = await Player.find();
        res.json(players)
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Server Error'})
    }
})


// get players by id
router.get("/:id",async (req, res) => {
  try{
    const player = await Player.findById(req.params.id);
    if(!player){
        return res.status(404).json({message:'Player not found'});
    }
    res.json(player)
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server Error'})
  }
});

//add a new player
router.post('/',async(req,res)=>{
    const {name,position,nationality,age} = req.body;
    try{
        const newPlayer = new Player({name,position,nationality,age});
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'server error'})
    }
})


// Update Player
router.put('/:id', async(req,res)=>{
    const {name,position,nationality,age} = req.body;
    try{
        const player = await Player.findByIdAndUpdate(req.params.id,{name,position,nationality,age},{new:true});
        if(!player){
            return res.status(404).json({message:'Player not found'})
        }
        res.json(player);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'server error'})
    }
})


//delete player 
router.delete('/:id',async(req,res) =>{
    try{
        const player = await Player.findByIdAndDelete(req.params.id);
        if(!player){
            return res.status(404).json({message:'player not found'})
        }
        res.json({message:'player deleted successfully'});
    }catch(err){
        console.error(err);
        res.status(500).json({messsage:'server error'})
    }
})

module.exports = router;

