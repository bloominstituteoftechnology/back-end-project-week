const helmet=require('helmet');
const express=require('express');
const morgan=require('morgan');

module.exports=server=>{
    server.use(express.json()).use(helmet()).use(morgan('dev'));
}