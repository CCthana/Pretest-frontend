import axiosInstance from "../utils/axios";

interface AddQuoteInput {
    userId: number;
    title: string;
}

const quoteApi = {
    addQuote: (input: AddQuoteInput, token: string) =>
    axiosInstance.post('/quote', input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    getAllQuote: (token: string) => axiosInstance.get('/quote', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }),
    voteQuote: (quoteId: number, token: string) => axiosInstance.patch(`/quote/${quoteId}/vote`, {} , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
     searchQuote: (quote: string, token: string) => axiosInstance.get(`/quote/search/${quote}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
   //  getMyVoteQuote: () => axiosInstance.get('/quote/my-vote'),
   //  getQuoteBySearchInput: (input: string) => axiosInstance.get(`/quote/search?term=${input}`)
}

export default quoteApi