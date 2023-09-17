import { OpenAI } from "langchain/llms/openai";
import { NextRequest, NextResponse } from "next/server";

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});
export async function GET(req: NextRequest) {
  const prompt = (await req.nextUrl.searchParams.get("prompt")) || "";
  const result = await llm.predict(prompt);
  if (!result) {
    return NextResponse.json({
      error: "something went wrong on server",
      status: 500,
    });
  }
  return NextResponse.json({ result, status: 200 });
}
