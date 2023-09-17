"use client";
import { useState } from "react";

const Landchain = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const reqForAiModel = async () => {
    try {
      setLoading(true);
      const resp: any = await fetch(`/api/langchain?prompt=${prompt}`);
      const res = await resp.json();
      console.log("res", res);
      setResult(res.result);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[100vh] flex">
      <div className="bg-[#2b2b31] w-[240px]"></div>
      <div className="flex flex-col justify-between h-full  m-auto">
        {/* chatgpt upper portion */}
        <div className="flex justify-center">
          <div className="font-[900] mt-10 text-[#565869] text-2xl">
            ChatGPT
          </div>
        </div>
        {/* chatgpt lower portion */}
        <div className="gap-3 flex mb-10 flex-col">
          <div className="max-w-[700px]">
            {!loading ? (
              !!result ? (
                <div className="bg-[#0a0a0d] rounded-xl p-3">
                  <p className="text-gray-300">{result}</p>
                </div>
              ) : (
                <></>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Send a Message"
              value={prompt}
              className="text-gray-400 pr-11 shadow-sm shadow-slate-950 w-[700px] focus-visible:ring-0 rounded-md bg-[#565869] ring-1 ring-[#565869] py-3 pl-3 text-sm"
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            {prompt && (
              <button
                className="px-4 py-2 ring-1 -ml-11 mt-[3px] bg-green-200 text-[#565869] rounded-xl pl-[12px] w-9 h-9 text-2xl pt-[3px] font-extrabold"
                onClick={reqForAiModel}
              >
                &gt;
              </button>
            )}
          </div>
          <p className="text-[10px] text-center text-gray-400">
            Free Research Preview. ChatGPT may produce inaccurate information
            about people, places, or facts.
            <span className="underline">ChatGPT August 3 Version</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landchain;
