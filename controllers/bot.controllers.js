const { Configuration, OpenAIApi } = require("openai");
const { google } = require("googleapis");
const { version } = require("mongoose");
const { auth } = require("googleapis/build/src/apis/abusiveexperiencereport");
const { CohereClientV2 } = require('cohere-ai');
const Anthropic = require('@anthropic-ai/sdk');
const fetch = require('node-fetch');
const fs = require("fs");
const pdf = require("pdf-parse");


async function extractTextFromPDF(req, res) {

    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(dataBuffer);
    const summary = await cohereCompletion("please summarize this text: "+ data.text)
    return res.json(
        {
            "answer": summary
        }
    );
}


async function gptCompletion(msg) {
    const configuration = new Configuration({
        apiKey: process.env.GPT_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: 'user', content: msg }]
    });
    return completion.data.choices[0].message.content;
}

async function cohereCompletion(msg) {
    const cohere = new CohereClientV2({
        token: process.env.COHERE_KEY,
    });
    const completion = await cohere.chat({
        model: 'command-r-plus',
        messages: [
            {
                role: 'user',
                content: msg,
            },
        ],
    });
    return completion.message.content[0].text;
}

  async function claudeCompletion(msg){
    const apiKey = process.env.CLAUDIA_KEY;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ` ${apiKey}`,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          messages: [
            { role: 'user', content: msg }
          ],
          max_tokens: 100,
        }),
      });
      const data = await response.json();
      return data.content[0].text
  }

async function SendMSG_v2(user_msg, model_id) {
    try {
        var response_in_text;

        if (model_id === "gpt-3.5-turbo") {
            response_in_text = await gptCompletion(user_msg);
        }
		else if (model_id ==="claudia-3-5-sonnet-latest") {
			response_in_text = await claudeCompletion(user_msg)
		}
        else {
            response_in_text = await cohereCompletion(user_msg);
        }




        // const auth_google = new google.auth.GoogleAuth({
        //     keyFile: "atgapis1-be439365546b.json",
        //     scopes: "https://www.googleapis.com/auth/documents",
        // })
        // const client_google = await auth_google.getClient();

        // const googleDocs = google.docs({ version: "v1", auth: client_google });

        // documentId = "1qNrugwHaRfyJCJVyULcpEwjL4bPscVU-2s15ntaO1OY"

        // const title_text = `\nuser msg:\n`

        // const text_requests = {
        //     requests: [
        //         {
        //             insertText: {
        //                 endOfSegmentLocation: {},
        //                 text: title_text
        //             }
        //         },
        //         {
        //             insertText: {
        //                 endOfSegmentLocation: {},
        //                 text: `\nuser msg:\n`
        //             }
        //         },
        //         {
        //             updateTextStyle:
        //             {
        //                 range:
        //                 {
        //                     segmentId: '',
        //                     startIndex: 4,
        //                     endIndex: 4 + title_text.length
        //                 },
        //                 textStyle:
        //                 {
        //                     bold: true,
        //                 },
        //                 fields: 'bold',
        //             }
        //         }

        //     ]
        // };


        // const md_res = await googleDocs.documents.batchUpdate({
        //     auth: auth_google,
        //     documentId: documentId,
        //     requestBody://text_requests
        //     {
        //         requests: [
        //             {
        //                 insertText: {
        //                     endOfSegmentLocation: {},
        //                     text: `\nuser msg:\n`,
        //                 }
        //             },
        //             {
        //                 insertText: {
        //                     endOfSegmentLocation: {},
        //                     text: `\n${user_msg} \n`
        //                 }
        //             },
        //             {
        //                 insertText: {
        //                     endOfSegmentLocation: {},
        //                     text: `\ngpt answer:\n`
        //                 }
        //             },
        //             {
        //                 insertText: {
        //                     endOfSegmentLocation: {},
        //                     text: `${response_in_text}\n`
        //                 }
        //             }

        //         ]
        //     }
        // });



        return response_in_text;

    } catch (error) {
        console.log(error)
        return error
    }
}



function SendMSG(req, res) {
    try {
        //console.log(req.body.model_id)
        SendMSG_v2(req.body.msg, req.body.model_id)
            .then(resu => {
                return res.json(
                    {
                        "answer": resu
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

function getModelsList(req, res) {
    return res.json(
        {
            models: [
                {
                    model_name: "CohereAI (Command R+)",
                    model_id: "cohere"
                },
                {
                    model_name: "Gpt3.5-turbo",
                    model_id: "gpt-3.5-turbo"
                },
                {
                    model_name: "Anthropic-ai (claudia-3-5-sonnet-latest)",
                    model_id: "claudia-3-5-sonnet-latest"
                }
            ]
        }
    )

}


module.exports =
{
    SendMSG,
    getModelsList,
    extractTextFromPDF
};