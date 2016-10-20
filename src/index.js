import express from 'express';
import server from './app';

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log('Starting server on port', port);
});

export default server;
