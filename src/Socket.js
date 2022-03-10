import io from 'socket.io-client'

export const socket = io('ws://quesoft.herokuapp.com/:5000');