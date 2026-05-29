const { Telegraf } = require('telegraf');
const { createClient } = require('@supabase/supabase-js');

const bot = new Telegraf(process.env.BOT_TOKEN);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

bot.command('register', async (ctx) => {
    const phone = ctx.message.text.split(' ')[1];
    const { error } = await supabase.from('users').insert([{ phone, balance: 0 }]);
    ctx.reply(error ? 'Ошибка: ' + error.message : 'Аккаунт создан!');
});

bot.launch();
