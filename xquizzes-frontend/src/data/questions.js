// src/data/questions.js
const questions = {
  cn: [
    {
      question: "Which protocol is used to find MAC address from IP?",
      options: ["ARP", "RARP", "ICMP", "TCP"],
      answer: 0
    },
    {
      question: "Which layer does TCP operate at?",
      options: ["Network", "Transport", "Data Link", "Application"],
      answer: 1
    },
    {
      question: "A connectionless transport protocol is:",
      options: ["TCP", "UDP", "SCTP", "DCCP"],
      answer: 1
    }
  ],

  os: [
    {
      question: "Which CPU scheduling algorithm is preemptive?",
      options: ["FCFS", "SJF (non-preemptive)", "Round Robin", "None of the above"],
      answer: 2
    },
    {
      question: "Virtual memory uses which technique?",
      options: ["Paging", "Clustering", "Segmentation only", "Encryption"],
      answer: 0
    }
  ],

  dbms: [
    {
      question: "Which normal form removes transitive dependency?",
      options: ["1NF", "2NF", "3NF", "BCNF"],
      answer: 2
    },
    {
      question: "Which SQL statement is used to remove a row?",
      options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
      answer: 0
    }
  ],

  algo: [
    {
      question: "Time complexity of binary search (sorted array)?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      answer: 1
    },
    {
      question: "Dijkstra's algorithm finds shortest paths for graphs with:",
      options: ["Negative weights allowed", "No negative weights", "Only trees", "Unweighted graphs"],
      answer: 1
    }
  ],

  dm: [
    {
      question: "Which of the following is a tautology?",
      options: ["P ∧ ¬P", "P ∨ ¬P", "P → P", "¬P ∧ ¬P"],
      answer: 2
    }
  ]
};

export default questions;
