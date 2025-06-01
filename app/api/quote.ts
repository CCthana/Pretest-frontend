import axiosInstance from "../utils/axios";

interface AddQuoteInput {
    userId: number;
    title: string;
}

interface EditInput {
   id: number;
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
     getMyVote: (token: string) => axiosInstance.get('/quote/myvote', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    getMyQuote: (token: string) => axiosInstance.get('/quote/myquote', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
     editQuote: (input: EditInput, token: string) => axiosInstance.patch(`/quote`, input , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
export default quoteApi