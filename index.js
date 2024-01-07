const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const express = require('express')
const cors = require('cors');
const controller = require(`./tg-controller`);
const router = require('../../jwt-auth/Server/routes/Router');

const PORT = process.env.PORT || 8000;
const token = process.env.TOKEN;

const app = express();

app.use(express.json());
app.use(cors());
app.use(`/`, router)

app.listen(PORT, () => console.log(`Server was started`));

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async msg => {
    const text = msg.text;
    
    if(text === '/start'){
       await controller.sendButtons(bot, msg);
    }
    if(msg?.web_app_data?.data){
            await controller.sendFormData(bot, msg);
    }
})