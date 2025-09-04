export type Dealer = {
  id: number;
  name: string;
  email: string;
  status: "success" | "processing" | "pending" | "failed" | "paid";
  balance: number;
};

export const DealersData: Dealer[] = [
  { id: 1, name: "Alice Khan", email: "alice@example.com", status: "success", balance: 1520.45 },
  { id: 2, name: "Bilal Ahmad", email: "bilal@example.com", status: "processing", balance: 248.0 },
  { id: 3, name: "Sana Malik", email: "sana@example.com", status: "pending", balance: 560.1 },
  { id: 4, name: "Danish Ali", email: "danish@example.com", status: "failed", balance: 0 },
  { id: 5, name: "Zara Rehman", email: "zara@example.com", status: "paid", balance: 1100.0 },
  { id: 6, name: "Tariq Shah", email: "tariq@example.com", status: "success", balance: 825.25 },
  { id: 7, name: "Areeba Sheikh", email: "areeba@example.com", status: "pending", balance: 499.99 },
  { id: 8, name: "Fahad Mir", email: "fahad@example.com", status: "paid", balance: 1399.49 },
  { id: 9, name: "Hina Abbas", email: "hina@example.com", status: "processing", balance: 620.78 },
  { id: 10, name: "Omar Farooq", email: "omar@example.com", status: "failed", balance: 0 },
  { id: 11, name: "Noor Fatima", email: "noor@example.com", status: "success", balance: 888.88 },
  { id: 12, name: "Imran Bhatti", email: "imran@example.com", status: "processing", balance: 129.5 },
  { id: 13, name: "Laiba Javed", email: "laiba@example.com", status: "pending", balance: 715.33 },
  { id: 14, name: "Rashid Mehmood", email: "rashid@example.com", status: "paid", balance: 1900.0 },
  { id: 15, name: "Mehak Riaz", email: "mehak@example.com", status: "success", balance: 1033.67 },
  { id: 16, name: "Yasir Ali", email: "yasir@example.com", status: "processing", balance: 200.0 },
  { id: 17, name: "Iqra Siddiqui", email: "iqra@example.com", status: "pending", balance: 459.99 },
  { id: 18, name: "Usman Qureshi", email: "usman@example.com", status: "failed", balance: 0 },
  { id: 19, name: "Mahnoor Aziz", email: "mahnoor@example.com", status: "success", balance: 875.2 },
  { id: 20, name: "Zeeshan Tariq", email: "zeeshan@example.com", status: "paid", balance: 1555.55 },
  { id: 21, name: "Ayesha Zafar", email: "ayesha@example.com", status: "processing", balance: 312.45 },
  { id: 22, name: "Ali Nawaz", email: "ali@example.com", status: "success", balance: 920.0 },
  { id: 23, name: "Fatima Yousaf", email: "fatima@example.com", status: "pending", balance: 749.49 },
  { id: 24, name: "Hassan Raza", email: "hassan@example.com", status: "paid", balance: 1010.1 },
  { id: 25, name: "Aiman Saleem", email: "aiman@example.com", status: "processing", balance: 320.25 },
  { id: 26, name: "Noman Iqbal", email: "noman@example.com", status: "failed", balance: 0 },
  { id: 27, name: "Rabia Khurshid", email: "rabia@example.com", status: "success", balance: 1300.0 },
  { id: 28, name: "Talha Mirza", email: "talha@example.com", status: "paid", balance: 1105.75 },
  { id: 29, name: "Sara Qazi", email: "sara@example.com", status: "pending", balance: 499.0 },
  { id: 30, name: "Adnan Shahid", email: "adnan@example.com", status: "processing", balance: 650.0 },
]; 