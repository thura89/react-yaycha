import { AlertTitle, Box } from "@mui/material";
import React from "react";
import Item from "../components/Item";
import Form from "../components/Form";
import { queryClient, useApp } from "../ThemedApp";
import { useMutation, useQuery } from "react-query";

const api = import.meta.env.VITE_API;
const Home = () => {
  const { setGlobalMsg, showForm } = useApp();

  const { isLoading, isError, error, data } = useQuery("posts", async () => {
    const res = await fetch(`${api}/content/posts`);
    return res.json(res);
  });

  const remove = useMutation(
    async (id) => {
      await fetch(`${api}/content/posts/${id}`, {
        method: "DELETE",
      });
    },
    {
      onMutate: (id) => {
        queryClient.cancelMutations("posts");
        queryClient.setQueryData("posts", (old) =>
          old.filter((item) => item.id !== id)
        );
        setGlobalMsg("A Post Deleted");
      },
    }
  );

  // const remove = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  //   setGlobalMsg("The Item was Deleted");
  // };
  const add = (content, name) => {
    // const id = data[data.length - 1].id + 1;
    // setData([...data, { name, content, id }]);
    // setGlobalMsg("The Item was Added");
  };

  if (isError) {
    return (
      <Box>
        <AlertTitle variant="warning">Data cannot fetch</AlertTitle>
      </Box>
    );
  }
  if (isLoading) {
    return (
      <Box>
        <AlertTitle variant="info">Loading...</AlertTitle>
      </Box>
    );
  }

  return (
    <Box>
      {showForm && <Form add={add} />}
      {data.map((item) => {
        return <Item key={item.id} item={item} remove={remove.mutate} />;
      })}
    </Box>
  );
};

export default Home;
