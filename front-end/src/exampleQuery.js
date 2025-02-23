import { useQuery } from "@tanstack/react-query";

export const fetchDummyData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  const user = {
    id: data?.id || "",
    userId: data?.userId || "",
    title: data?.title || "",
    // userId: data?.userId || "",
  };
  return user;
};

export const useDummyData = () => {
  return useQuery({ queryKey: ["dummy"], queryFn: fetchDummyData });
};
