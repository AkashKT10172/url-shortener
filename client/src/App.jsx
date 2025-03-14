import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (url === "") {
      console.log("Enter Valid URL!");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://url-shortener-36wp.onrender.com/url",
        { url },
        config
      );
      setShortUrl(data.id);
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");
    }
    setUrl("");
  };

  const copyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(`https://url-shortener-36wp.onrender.com/${shortUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">URL SHORTENER</h1>
      <form className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <label className="block text-gray-700 font-medium mb-2">
          Enter the URL:
          <input
            type="text"
            className="w-full mt-2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button
          type="submit"
          onClick={handleFormSubmission}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Get Your Short URL!
        </button>
      </form>
      {shortUrl && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
          Your Short URL is :{" "}
          <a
            target="_blank"
            href={`https://url-shortener-36wp.onrender.com/${shortUrl}`}
            className="text-blue-600 underline"
          >
            {`https://url-shortener-36wp.onrender.com/${shortUrl}`}
          </a>
          <button
            onClick={copyToClipboard}
            className="ml-2 px-1 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition cursor-pointer"
          >
            📋
          </button>
          {copied && <p className="text-sm text-green-600 mt-2 text-center">Copied!</p>}
        </div>
      )}
    </div>
  );
};

export default App;
