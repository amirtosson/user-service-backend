const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "org-NNObuKEppqfaG6dILlKMUIgN",
  });
  const openai = new OpenAIApi(configuration);

async function runCompletion (msg) {
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{role:'user', content:msg}]
});
return completion.data.choices[0];
}


function SendMSG(req, res){
    try {
        runCompletion(req.body.msg)
        .then(resu=>{
            return res.json(
                { 
                    "answer": resu.message.content  
                }
            );
    
        })
    } catch (error) {
        return res.json(
            { 
                "answer": error 
            }
        );
    }


}


module.exports = {SendMSG};