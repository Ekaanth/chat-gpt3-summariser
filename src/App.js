import "./App.css";
import React, { useEffect, useState } from "react";
import { getProductSummary } from "./services/productSummary";

const CONTAIN_PRODUCT_URL = ["p", "product"];

function App() {
  const [currentTabURL, setCurrentTabURL] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isValidUrl, setIsValidUrl] = useState(false);
  useEffect(() => {
    setSummary(null);
    fetchcurrentTabURL();
  }, []);

  useEffect(() => {
    if (currentTabURL !== null) {
      const urlSplit = currentTabURL.split("/");
      const isProductUrl = urlSplit.some(
        (r) => CONTAIN_PRODUCT_URL.indexOf(r) >= 0
      );
      console.log("isValidURL", isProductUrl);
      console.log("currentTabURL", currentTabURL);
      if (isProductUrl) {
        const reviews = async () => {
          let reviews = await getProductSummary(currentTabURL);
          setSummary(() => reviews);
          productSummary();
          setIsLoading(false);
          setIsValidUrl(true);
        };
        reviews();
      } else {
        setIsLoading(false);
        setIsValidUrl(false);
      }
    }
  }, [currentTabURL]);

  const fetchcurrentTabURL = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const activeTabUrl = activeTab.url;
      setCurrentTabURL(activeTabUrl);
    });
  };

  const productSummary = () => {
    return (
      <div>
        <div className="flex justify-center">
          <h2>The product summary</h2>
        </div>
        <div dangerouslySetInnerHTML={{ __html: summary }}></div>
      </div>
    );
  };

  const notProduct = () => {
    return (
      <div className="flex justify-center">
        <span>
          This page does not contains any products. Currently, avaliable only
          for amazon and flipkart products
        </span>
      </div>
    );
  };

  return (
    <div className="my-2">
      {isLoading ? (
        <div className="relative py-44 place-items-center">
          <div className="spin"></div>
        </div>
      ) : (
        <div>{isValidUrl ? productSummary() : notProduct()}</div>
      )}
    </div>
  );
}
export default App;
