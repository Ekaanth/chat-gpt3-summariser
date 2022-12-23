const CHATGPT3_API = "ADD YOUR KEY";

export async function getProductSummary(reviewUrl) {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CHATGPT3_API}`,
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      prompt: `Summarize all the pros and cons of this product based on the reviews given by the users to the product.
      List them in bulletin points with html list tags add dash to the start of each ul list: ${reviewUrl}`,
      model: "text-davinci-003",
      max_tokens: 256,
      temperature: 0.7,
      top_p: 1,
    }),
  });
  console.log("response", response);
  const data = await response.json();
  return data.choices[0].text;
}
