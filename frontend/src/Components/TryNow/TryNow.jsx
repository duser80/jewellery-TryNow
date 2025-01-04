import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";

const TryNow = ({ category }) => {
  const [iframeSrc, setIframeSrc] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (category) {
      // Start the streaming if the category is set
      const apiEndpoint = `${axiosInstance.defaults.baseURL}video/${category}`;
      setIframeSrc(apiEndpoint);
      setIsStreaming(true);
    } else {
      // Reset if no category is selected
      setIframeSrc("");
      setIsStreaming(false);
    }
  }, [category]); // Dependency on category to re-trigger the effect when it changes

  const stopStreaming = async () => {
    try {
      // Use axiosInstance for the POST request
      await axiosInstance.post("stop-process", { category });
      setIframeSrc("");
      setIsStreaming(false);
    } catch (error) {
      console.error("Error stopping the streaming process:", error);
    }
  };

  return (
    <div className="overflow-hidden">
      {isStreaming ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-9/12 h-11/12 max-w-[690px] max-h-3xl bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Virtual Try-On
            </h2>
            <p className="text-lg text-gray-500 text-center mb-6">
              Try on your favorite {category} design
            </p>
            <iframe
              src={iframeSrc}
              title="Streaming Content"
              style={{ height: "500px", overflow: "hidden", boxSizing: "border-box" }}
              className="w-full border-none rounded-lg"
            ></iframe>
            <button
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
              onClick={stopStreaming}
            >
              ✖
            </button>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-600 text-center">
          Select a category to start streaming.
        </p>
      )}
    </div>
  );
};

export default TryNow;