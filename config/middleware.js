const helmet=require('helmet');
const express=require('express');
const morgan=require('morgan');
const cors=require('cors');

module.exports=server=>{
    server.use(express.json()).use(helmet()).use(morgan('dev')).use(cors());
}