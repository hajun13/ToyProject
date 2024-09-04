import express from 'express';
import cors from 'cors';
import OpenAI from "openai";
import serverless from "serverless-http";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // 환경 변수에서 API 키를 불러옴
});


//serverless-http 설정
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(cors());

// CORS 설정
const corsOptions = {
    origin: "https://chatbitdam.pages.dev",
    credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.post('/fortuneTell', async function (req, res) {
    let { userMessages, assistantMessages } = req.body;
    console.log(userMessages);
    console.log(assistantMessages);

    try {
        let messages = [
            {
                role: "system",
                content: "너는 신학과 상담학을 전공한 세계최고의 상담가이자 목회자야, 너는 상담업무를 담당해. 어떤 고민이나 상담을 하더라도 성경에 기반해서 질문에 답변을 해줘, 너의 이름은 빛담이야. Maximum Tokens는 1024야 그 안에서 답변을 해줘, 답변에서 글씨 강조는 하지 않도록 해줘",
            },
            {
                role: "user",
                content: "너는 신학과 상담학을 전공한 세계최고의 상담가이자 목회자야, 너는 상담업무를 담당해. 어떤 고민이나 상담을 하더라도 성경에 기반해서 질문에 답변을 해줘, 너의 이름은 빛담이야. Maximum Tokens는 1024야 그 안에서 답변을 해줘",
            },
            {
                role: "assistant",
                content: "안녕하세요, 저는 빛담입니다. 여러분의 고민과 상담에 대해 성경에 기반한 답변을 드리겠습니다. 어떤 고민이든 털어놓아 주시면, 함께 기도를 하며 지혜를 나누겠습니다. 어떤 질문이든 주저하지 말고 말씀해 주세요.",
            },
        ];

        while (userMessages.length !== 0 || assistantMessages.length !== 0) {
            if (userMessages.length !== 0) {
                messages.push({
                    role: "user",
                    content: userMessages.shift().replace(/\n/g, "").replace(/\*\*/g, "")
                });
            }
            if (assistantMessages.length !== 0) {
                messages.push({
                    role: "assistant",
                    content: assistantMessages.shift().replace(/\n/g, "").replace(/\*\*/g, "")
                });
            }
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",  // 올바른 모델 이름을 사용하세요
            messages: messages
        });

        let fortune = completion.choices[0].message['content'].replace(/\*\*/g, "");
        res.json({ "assistant": fortune });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

export const handler = serverless(app);

/* app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
}); */