
class Controller {
    async sendButtons(bot, msg){
        try{
            const chatId = msg.chat.id;
        await bot.sendMessage(chatId, 'Ниже можно посмотреть наши товары', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполни форму', web_app: {url: process.env.WEBAPPURL + `/form`}}]
                ]
            }
        });
        await bot.sendMessage(chatId, 'Ниже появится кнопка заполни форму', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'сделать заказ', web_app: {url: process.env.WEBAPPURL}}]
                ]
            }
        })

        return;
        }
        catch(err){
            console.log(`Send buttons error`)
        }
        
    }
    async sendFormData(bot, msg){
        const chatId = msg.chat.id;
        try{
            const data = JSON.parse(msg.web_app_data.data);

            await bot.sendMessage(chatId, 'Спасибо за обратную связь')
            await bot.sendMessage(chatId, `Ваша страна ${data.country}`)
            await bot.sendMessage(chatId, `Ваша улица ${data.street}`)
        }
        catch(err){
            console.log(err.message);
        }
    }
}

module.exports = new Controller();